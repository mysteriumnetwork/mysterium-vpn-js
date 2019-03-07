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

import { TequilapiClient } from 'mysterium-tequilapi/lib/client'
import { ServiceInfoDTO } from 'mysterium-tequilapi/lib/dto/service-info'
import { ServiceStatus as ServiceStatusDTO } from 'mysterium-tequilapi/lib/dto/service-status'
import TequilapiError from 'mysterium-tequilapi/lib/tequilapi-error'
import { logger } from '../logger'
import { ServiceStatus } from '../models/service-status'
import { FunctionLooper } from './looper/function-looper'
import { Publisher } from './publisher'

export class ProviderService {
  private statusPublisher: Publisher<ServiceStatus> = new Publisher()

  private serviceId?: string
  private statusFetcher?: FunctionLooper
  private lastStatus: ServiceStatus = ServiceStatus.NOT_RUNNING

  constructor (
    private tequilapiClient: TequilapiClient,
    private providerId: string,
    private serviceType: string) {}

  public async start () {
    const info = await this.tequilapiClient.serviceStart({ providerId: this.providerId, type: this.serviceType })
    this.serviceId = info.id
    this.processNewServiceInfo(info)
    this.startFetchingStatus()
  }

  public async stop () {
    if (!this.serviceId) {
      throw new Error('Service id is unknown, make sure to start service before stopping it')
    }

    await this.tequilapiClient.serviceStop(this.serviceId)
  }

  public addStatusSubscriber (subscriber: (newStatus: ServiceStatus) => any) {
    this.statusPublisher.addSubscriber(subscriber)
    subscriber(this.lastStatus)
  }

  public removeStatusSubscriber (subscriber: (newStatus: ServiceStatus) => any) {
    this.statusPublisher.removeSubscriber(subscriber)
  }

  private startFetchingStatus () {
    this.statusFetcher = new FunctionLooper(async () => this.fetchStatus(), 1000)
    this.statusFetcher.start()
  }

  private async stopFetchingStatus () {
    if (!this.statusFetcher) {
      return
    }

    await this.statusFetcher.stop()
    this.statusFetcher = undefined
  }

  private async fetchStatus () {
    if (!this.serviceId) {
      logger.error('Service status fetching failed because serviceId is missing')
      return
    }
    try {
      const info = await this.tequilapiClient.serviceGet(this.serviceId)
      this.processNewServiceInfo(info)
    } catch (err) {
      if (err.name === TequilapiError.name && (err as TequilapiError).isNotFoundError) {
        this.processStatus(ServiceStatus.NOT_RUNNING)
        this.stopFetchingStatus().catch((err: Error) => logger.error('Failed stopping fetching status', err))
        return
      }

      throw err
    }
  }

  private processNewServiceInfo (info: ServiceInfoDTO) {
    const status = this.serviceStatusDTOToModel(info.status)
    this.processStatus(status)
  }

  private processStatus (status: ServiceStatus) {
    if (status === this.lastStatus) {
      return
    }

    this.statusPublisher.publish(status)
    this.lastStatus = status
  }

  private serviceStatusDTOToModel (status: ServiceStatusDTO): ServiceStatus {
    if (status === ServiceStatusDTO.NOT_RUNNING) {
      return ServiceStatus.NOT_RUNNING
    }
    if (status === ServiceStatusDTO.STARTING) {
      return ServiceStatus.STARTING
    }
    if (status === ServiceStatusDTO.RUNNING) {
      return ServiceStatus.RUNNING
    }
    throw new Error(`Unknown status: ${status}, ${ServiceStatusDTO.NOT_RUNNING}`)
  }
}
