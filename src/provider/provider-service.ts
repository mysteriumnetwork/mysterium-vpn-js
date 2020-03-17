/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TequilapiClient } from '../tequilapi-client'
import { AccessPolicy } from '../access-policy/access-policy'
import { ServiceStatus } from '../provider/service-status'
import { TequilapiError } from '../tequilapi-error'
import { FunctionLooper } from '../func/function-looper'
import { logger } from '../logger'
import { Publisher } from '../func/publisher'
import { ServiceInfo } from './service-info'
import { ServiceRequest } from './service-request'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StatusSubscriber = (newStatus: ServiceStatus) => any

export class ProviderService {
  private statusPublisher: Publisher<ServiceStatus> = new Publisher()
  private statusFetcher?: FunctionLooper
  private lastStatus: ServiceStatus = ServiceStatus.NOT_RUNNING
  private tequilapiClient: TequilapiClient

  public constructor(tequilapiClient: TequilapiClient) {
    this.tequilapiClient = tequilapiClient
  }

  public async checkForExistingService(): Promise<void> {
    const service = await this.findRunningService()
    if (!service) {
      return
    }

    this.handleStartedService(service)
  }

  public async isActive(): Promise<boolean> {
    try {
      const service = await this.findRunningService()

      return !!service
    } catch (e) {
      // no need to handle
    }

    return false
  }

  public async findRunningService(): Promise<ServiceInfo | undefined> {
    try {
      const services = await this.tequilapiClient.serviceList()
      return services.pop()
    } catch (e) {
      // no need to handle
    }
  }

  public async getFirstAccessPolicy(): Promise<AccessPolicy | null> {
    try {
      const accessPolicies = await this.tequilapiClient.accessPolicies()

      if (accessPolicies.length > 0) {
        return accessPolicies[0]
      }
    } catch (e) {
      logger.error('Failed fetching first access policy', e)
    }

    return null
  }

  public async start(
    providerId: string,
    serviceType: string,
    accessPolicyId?: string,
    options?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any
    }
  ): Promise<void> {
    const request: ServiceRequest = {
      options,
      providerId,
      type: serviceType,
    }

    if (accessPolicyId) {
      request.accessPolicies = {
        ids: [accessPolicyId],
      }
    }

    const service = await this.tequilapiClient.serviceStart(request)

    this.handleStartedService(service)
  }

  public async stop(): Promise<void> {
    const service = await this.findRunningService()

    if (service) {
      await this.tequilapiClient.serviceStop(service.id)
      await this.stopFetchingStatus()
      this.processStatus(ServiceStatus.NOT_RUNNING)
    }
  }

  public addStatusSubscriber(subscriber: StatusSubscriber): void {
    this.statusPublisher.addSubscriber(subscriber)
    subscriber(this.lastStatus)
  }

  public removeStatusSubscriber(subscriber: StatusSubscriber): void {
    this.statusPublisher.removeSubscriber(subscriber)
  }

  private handleStartedService(service: ServiceInfo): void {
    this.processNewServiceInfo(service)
    this.startFetchingStatus(service)
  }

  private startFetchingStatus(service: ServiceInfo): void {
    this.statusFetcher = new FunctionLooper(async () => this.fetchStatus(service), 1000)
    this.statusFetcher.start()
  }

  private async stopFetchingStatus(): Promise<void> {
    if (!this.statusFetcher) {
      return
    }

    await this.statusFetcher.stop()

    this.statusFetcher = undefined
  }

  private async fetchStatus(service: ServiceInfo): Promise<void> {
    try {
      service = await this.tequilapiClient.serviceGet(service.id)
      this.processNewServiceInfo(service)
    } catch (err) {
      if (err.name === TequilapiError.name && (err as TequilapiError).isNotFoundError) {
        this.processStatus(ServiceStatus.NOT_RUNNING)
        this.stopFetchingStatus().catch((err: Error) =>
          logger.error('Failed stopping fetching status', err)
        )
        return
      }

      throw err
    }
  }

  private processNewServiceInfo(info: ServiceInfo): void {
    this.processStatus(info.status)
  }

  private processStatus(status: ServiceStatus): void {
    if (status === this.lastStatus) {
      return
    }

    this.statusPublisher.publish(status)
    this.lastStatus = status
  }
}
