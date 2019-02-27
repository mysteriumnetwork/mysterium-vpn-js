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

import { ServiceInfoDTO } from 'mysterium-tequilapi/lib/dto/service-info'
import { ServiceRequest } from 'mysterium-tequilapi/lib/dto/service-request'
import { ServiceStatus } from 'mysterium-tequilapi/lib/dto/service-status'
import { ProviderService } from '../../domain/provider-service'
import { EmptyTequilapiClientMock } from '../utils/empty-tequilapi-client-mock'

class ProviderServiceTequilapiClientMock extends EmptyTequilapiClientMock {
  public serviceStarted?: ServiceRequest
  public serviceStopped?: string

  public async serviceStart (request: ServiceRequest, timeout?: number): Promise<ServiceInfoDTO> {
    this.serviceStarted = request

    const options: { [key: string]: any } = {}
    const proposal = { id: 1, providerId: request.providerId, serviceType: request.serviceType, serviceDefinition: {} }
    return { id: 'service id', status: ServiceStatus.STARTING, proposal, options }
  }

  public async serviceStop (serviceId: string): Promise<void> {
    this.serviceStopped = serviceId
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
      const expectedService: ServiceRequest = { providerId: 'my provider id', serviceType: 'test service' }
      expect(tequilapiClient.serviceStarted).toEqual(expectedService)
    })
  })

  describe('.stop', () => {
    it('stops providing service', async () => {
      await service.stop()
      expect(tequilapiClient.serviceStopped).toEqual('test service')
    })
  })
})
