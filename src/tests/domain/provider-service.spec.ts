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

import lolex, { InstalledClock, NodeClock } from 'lolex'
import { ServiceInfoDTO } from 'mysterium-tequilapi/lib/dto/service-info'
import { ServiceRequest } from 'mysterium-tequilapi/lib/dto/service-request'
import { ServiceStatus } from 'mysterium-tequilapi/lib/dto/service-status'
import { ProviderService } from '../../domain/provider-service'
import { EmptyTequilapiClientMock } from '../utils/empty-tequilapi-client-mock'
import { nextTick } from '../utils/utils'

class ProviderServiceTequilapiClientMock extends EmptyTequilapiClientMock {
  public serviceStarted?: ServiceRequest
  public serviceStopped?: string
  public serviceGetInvoked = 0

  private serviceInfoMocks: Map<string, ServiceInfoDTO> = new Map<string, ServiceInfoDTO>()
  private servicesCreated: number = 0

  public async serviceGet (serviceId: string): Promise<ServiceInfoDTO> {
    this.serviceGetInvoked++

    const info = this.serviceInfoMocks.get(serviceId)
    if (info === undefined) {
      throw Error('Service info is not available')
    }
    return info
  }

  public async serviceStart (request: ServiceRequest, timeout?: number): Promise<ServiceInfoDTO> {
    this.serviceStarted = request

    const options: { [key: string]: any } = {}
    const proposal = { id: 1, providerId: request.providerId, serviceType: request.type, serviceDefinition: {} }
    this.servicesCreated += 1
    const serviceId = `service id ${this.servicesCreated}`
    const serviceInfo = {
      id: serviceId,
      options,
      proposal,
      providerId: request.providerId,
      status: ServiceStatus.STARTING,
      type: request.type
    }

    this.serviceInfoMocks.set(serviceId, serviceInfo)
    return serviceInfo
  }

  public async serviceStop (serviceId: string): Promise<void> {
    this.serviceStopped = serviceId

    const info = this.serviceInfoMocks.get(serviceId)
    if (!info) {
      throw Error('Stopping service not found')
    }

    info.status = ServiceStatus.NOT_RUNNING
  }
}

describe('ProviderService', () => {
  let service: ProviderService
  let tequilapiClient: ProviderServiceTequilapiClientMock

  beforeEach(() => {
    tequilapiClient = new ProviderServiceTequilapiClientMock()
    service = new ProviderService(tequilapiClient, 'my provider id', 'test service')
  })

  describe('.start', () => {
    it('starts providing service', async () => {
      await service.start()
      const expectedService: ServiceRequest = { providerId: 'my provider id', type: 'test service' }
      expect(tequilapiClient.serviceStarted).toEqual(expectedService)
    })
  })

  describe('.stop', () => {
    it('stops providing service', async () => {
      await service.start()

      await service.stop()
      expect(tequilapiClient.serviceStopped).toEqual('service id 1')
    })

    it('throws error when stopping without starting', async () => {
      expect(service.stop())
        .rejects.toHaveProperty('message', 'Service id is unknown, make sure to start service before stopping it')
    })
  })

  describe('.addStatusSubscriber', () => {
    let clock: InstalledClock<NodeClock>

    beforeAll(() => {
      clock = lolex.install()
    })

    afterAll(() => {
      clock.uninstall()
    })

    it('invokes callback with NOT_RUNNING status initially', async () => {
      let status = null
      service.addStatusSubscriber((newStatus) => {
        status = newStatus
      })

      expect(status).toBe(ServiceStatus.NOT_RUNNING)
    })

    it('invokes callback with STARTING status after starting service', async () => {
      let status = null
      service.addStatusSubscriber((newStatus) => {
        status = newStatus
      })

      await service.start()
      expect(status).toBe(ServiceStatus.STARTING)
    })

    it('invokes callback with NOT_RUNNING after stopping service', async () => {
      let status = null
      service.addStatusSubscriber((newStatus) => {
        status = newStatus
      })

      await service.start()
      await service.stop()
      expect(status).toBe(ServiceStatus.NOT_RUNNING)
    })

    it('invokes callback with NOT_RUNNING if service stops unexpectedly', async () => {
      let status = null
      service.addStatusSubscriber((newStatus) => {
        status = newStatus
      })

      await service.start()
      await tequilapiClient.serviceStop('service id 1')

      // give some time for ProviderService to see this change
      clock.runToLast()
      await nextTick()

      expect(status).toBe(ServiceStatus.NOT_RUNNING)
    })

    it('does not send status requests after being stopped', async () => {
      await service.start()
      await service.stop()

      const serviceGetInvoked = tequilapiClient.serviceGetInvoked

      clock.runAll()
      await nextTick()
      clock.runToLast()
      await nextTick()

      expect(tequilapiClient.serviceGetInvoked).toEqual(serviceGetInvoked)
    })

    it('does not invoke with the same status again', async () => {
      const statuses: ServiceStatus[] = []
      service.addStatusSubscriber((newStatus) => {
        statuses.push(newStatus)
      })

      await service.start()

      clock.runAll()
      await nextTick()
      clock.runToLast()
      await nextTick()

      expect(statuses.filter((s) => s === ServiceStatus.STARTING).length).toEqual(1)
    })

    it('invokes callback with STARTING status when subscribing to starting service', async () => {
      await service.start()

      let status = null
      service.addStatusSubscriber((newStatus) => {
        status = newStatus
      })

      expect(status).toEqual(ServiceStatus.STARTING)
    })

    // TODO: if service is running, we should do ServiceList and find service by service type
  })

  describe('.removeStatusSubscriber', () => {
    it('stops invoking callback on status change', async () => {
      let status = null
      const callback = (newStatus: ServiceStatus) => {
        status = newStatus
      }
      service.addStatusSubscriber(callback)
      status = null

      service.removeStatusSubscriber(callback)
      await service.start()

      expect(status).toBeNull()
    })
  })
})
