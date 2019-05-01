/*
 * Copyright (C) 2019 The "mysteriumnetwork/mysterium-vpn-js" Authors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { TequilapiClient } from '../http-tequilapi-client'
import { AccessPolicyDTO } from '../access-policy'
import { ServiceInfoDTO, ServiceRequest, ServiceStatus as ServiceStatusDTO } from '../provider'
import TequilapiError from '../tequilapi-error'
import { FunctionLooper } from '../func'
import { logger } from '../logger'
import { Publisher } from './publisher'
import { ServiceStatus } from './service-status'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StatusSubscriber = (newStatus: ServiceStatus) => any

export class ProviderService {
  // Currently running service instance
  private serviceInstance?: ServiceInfoDTO

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

  public async findRunningService(): Promise<ServiceInfoDTO | undefined> {
    try {
      const services = await this.tequilapiClient.serviceList()
      return services.pop()
    } catch (e) {
      // no need to handle
    }
  }

  public async getFirstAccessPolicy(): Promise<AccessPolicyDTO | null> {
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
    if (!this.serviceInstance) {
      throw new Error('Service id is unknown, make sure to start service before stopping it')
    }

    await this.tequilapiClient.serviceStop(this.serviceInstance.id)
    await this.stopFetchingStatus()
    this.processStatus(ServiceStatus.NOT_RUNNING)
  }

  public addStatusSubscriber(subscriber: StatusSubscriber): void {
    this.statusPublisher.addSubscriber(subscriber)
    subscriber(this.lastStatus)
  }

  public removeStatusSubscriber(subscriber: StatusSubscriber): void {
    this.statusPublisher.removeSubscriber(subscriber)
  }

  private handleStartedService(service: ServiceInfoDTO): void {
    this.serviceInstance = service
    this.processNewServiceInfo(service)
    this.startFetchingStatus()
  }

  private startFetchingStatus(): void {
    this.statusFetcher = new FunctionLooper(async () => this.fetchStatus(), 1000)
    this.statusFetcher.start()
  }

  private async stopFetchingStatus(): Promise<void> {
    if (!this.statusFetcher) {
      return
    }

    await this.statusFetcher.stop()

    this.statusFetcher = undefined
  }

  private async fetchStatus(): Promise<void> {
    if (!this.serviceInstance) {
      logger.error('Service status fetching failed because serviceId is missing')
      return
    }

    try {
      const service = await this.tequilapiClient.serviceGet(this.serviceInstance.id)
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

  private processNewServiceInfo(info: ServiceInfoDTO): void {
    const status = ProviderService.serviceStatusDTOToModel(info.status)
    this.processStatus(status)
  }

  private processStatus(status: ServiceStatus): void {
    if (status === this.lastStatus) {
      return
    }

    this.statusPublisher.publish(status)
    this.lastStatus = status
  }

  private static serviceStatusDTOToModel(status: ServiceStatusDTO): ServiceStatus {
    if (status === ServiceStatusDTO.NOT_RUNNING) {
      return ServiceStatus.NOT_RUNNING
    }
    if (status === ServiceStatusDTO.STARTING) {
      return ServiceStatus.STARTING
    }
    if (status === ServiceStatusDTO.RUNNING) {
      return ServiceStatus.RUNNING
    }
    throw new Error(`Unknown status: ${status}`)
  }
}
