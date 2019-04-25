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
import { ServiceStatus as ServiceStatusDTO } from 'mysterium-tequilapi/lib/dto/service-status'
import TequilapiError from 'mysterium-tequilapi/lib/tequilapi-error'
import { EmptyTequilapiClientMock } from '../test-utils/empty-tequilapi-client-mock'
import { nextTick } from '../test-utils/utils'
import { ProviderService } from './provider-service'
import { ServiceStatus } from './service-status'

class ProviderServiceTequilapiClientMock extends EmptyTequilapiClientMock {
  public serviceStarted?: ServiceRequest
  public serviceStopped?: string
  public serviceGetInvoked = 0

  private serviceInfoMocks: Map<string, ServiceInfoDTO> = new Map<string, ServiceInfoDTO>()
  private servicesCreated: number = 0

  public async serviceList (): Promise<ServiceInfoDTO[]> {
    return Array.from(this.serviceInfoMocks.values())
  }

  public async serviceGet (serviceId: string): Promise<ServiceInfoDTO> {
    this.serviceGetInvoked++

    const info = this.serviceInfoMocks.get(serviceId)
    if (info === undefined) {
      throw this.buildTequilapiError('Service not found', 404)
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
      status: ServiceStatusDTO.STARTING,
      type: request.type
    }

    this.serviceInfoMocks.set(serviceId, serviceInfo)

    return serviceInfo
  }

  public async serviceStop (serviceId: string): Promise<void> {
    this.serviceStopped = serviceId

    if (!this.serviceInfoMocks.delete(serviceId)) {
      throw Error('Stopping service not found')
    }
  }

  // TODO: refactor TequilapiError to allow instantiating TequilapiError with custom status easier,
  // i.e. add 'status' as constructor parameter
  private buildTequilapiError (message: string, status: number) {
    const originalError = new Error(message)
    const originalErrorObj = originalError as any
    originalErrorObj.response = { status }
    return new TequilapiError(originalError, '/mock-path')
  }
}

describe('ProviderService', () => {
  let service: ProviderService
  let tequilapiClient: ProviderServiceTequilapiClientMock
  const providerId = 'my provider id'

  let clock: InstalledClock<NodeClock>

  beforeAll(() => {
    clock = lolex.install()
  })

  afterAll(() => {
    clock.uninstall()
  })

  beforeEach(() => {
    tequilapiClient = new ProviderServiceTequilapiClientMock()
    service = new ProviderService(tequilapiClient)
  })

  describe('.start', () => {
    it('starts providing service', async () => {
      await service.start(providerId, 'test service')
      const expectedService: ServiceRequest = { providerId, type: 'test service' }
      expect(tequilapiClient.serviceStarted).toEqual(expectedService)
    })
  })

  describe('.stop', () => {
    it('stops providing service', async () => {
      await service.start(providerId, 'test service')

      await service.stop()
      expect(tequilapiClient.serviceStopped).toEqual('service id 1')
    })

    it('throws error when stopping without starting', async () => {
      expect(service.stop())
        .rejects.toHaveProperty('message', 'Service id is unknown, make sure to start service before stopping it')
    })
  })

  describe('.checkForExistingService', () => {
    describe('when existing service is running', () => {
      beforeEach(async () => {
        const otherService = new ProviderService(tequilapiClient)
        await otherService.start(providerId, 'test service')
      })

      it('updates status when existing service is running', async () => {
        let status
        service.addStatusSubscriber((newStatus: ServiceStatus) => {
          status = newStatus
        })

        await service.checkForExistingService()
        expect(status).toBe(ServiceStatus.STARTING)
      })

      it('allows stopping existing service', async () => {
        await service.checkForExistingService()

        await service.stop()
      })

      it('starts notifying about later status changes', async () => {
        let status
        service.addStatusSubscriber((newStatus: ServiceStatus) => {
          status = newStatus
        })

        await service.checkForExistingService()
        await service.stop()

        // give some time for ProviderService to see this change
        await nextTick()
        clock.runToLast()
        await nextTick()

        expect(status).toBe(ServiceStatus.NOT_RUNNING)
      })
    })

    it('does not change status when no services are running', async () => {
      let status
      service.addStatusSubscriber((newStatus: ServiceStatus) => {
        status = newStatus
      })

      await service.checkForExistingService()
      expect(status).toBe(ServiceStatus.NOT_RUNNING)
    })
  })

  describe('.addStatusSubscriber', () => {
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

      await service.start(providerId, 'test service')
      expect(status).toBe(ServiceStatus.STARTING)
    })

    it('invokes callback with NOT_RUNNING after stopping service', async () => {
      let status = null
      service.addStatusSubscriber((newStatus) => {
        status = newStatus
      })

      await service.start(providerId, 'test service')
      await service.stop()

      // give some time for ProviderService to see this change
      await nextTick()
      clock.runToLast()
      await nextTick()

      expect(status).toBe(ServiceStatus.NOT_RUNNING)
    })

    it('invokes callback with NOT_RUNNING if service stops unexpectedly', async () => {
      let status = null
      service.addStatusSubscriber((newStatus) => {
        status = newStatus
      })

      await service.start(providerId, 'test service')
      await tequilapiClient.serviceStop('service id 1')

      // give some time for ProviderService to see this change
      await nextTick()
      clock.runToLast()
      await nextTick()

      expect(status).toBe(ServiceStatus.NOT_RUNNING)
    })

    it('does not send status requests after being stopped', async () => {
      await service.start(providerId, 'test service')
      await service.stop()

      // give some time for ProviderService to see this change
      clock.runAll()
      await nextTick()
      clock.runToLast()
      await nextTick()

      const serviceGetInvoked = tequilapiClient.serviceGetInvoked

      // wait for a possible pulling
      clock.runToLast()
      await nextTick()

      expect(tequilapiClient.serviceGetInvoked).toEqual(serviceGetInvoked)
    })

    it('does not invoke with the same status again', async () => {
      const statuses: ServiceStatus[] = []
      service.addStatusSubscriber((newStatus) => {
        statuses.push(newStatus)
      })

      await service.start(providerId, 'test service')

      clock.runAll()
      await nextTick()
      clock.runToLast()
      await nextTick()

      expect(statuses.filter((s) => s === ServiceStatus.STARTING).length).toEqual(1)
    })

    it('invokes callback with STARTING status when subscribing to starting service', async () => {
      await service.start(providerId, 'test service')

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
      await service.start(providerId, 'test service')

      expect(status).toBeNull()
    })
  })
})
