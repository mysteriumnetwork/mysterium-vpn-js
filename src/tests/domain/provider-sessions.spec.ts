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
import { ServiceSessionDTO } from 'mysterium-tequilapi/lib/dto/service-session'
import { ProviderSessions } from '../../domain/provider-sessions'
import { EmptyTequilapiClientMock } from '../utils/empty-tequilapi-client-mock'
import { nextTick } from '../utils/utils'

class ProviderServiceTequilapiClientMock extends EmptyTequilapiClientMock {
  public serviceSessionsMock: ServiceSessionDTO[] = [
    { id: 'id1', consumerId: '0x1' }
  ]

  public async serviceSessions (): Promise<ServiceSessionDTO[]> {
    return Promise.resolve(this.serviceSessionsMock)
  }
}

describe('ProviderSessions', () => {
  let service: ProviderSessions
  let tequilapiClient: ProviderServiceTequilapiClientMock
  let clock: InstalledClock<NodeClock>

  beforeAll(() => {
    clock = lolex.install()
  })

  afterAll(() => {
    clock.uninstall()
  })

  beforeEach(() => {
    tequilapiClient = new ProviderServiceTequilapiClientMock()
    service = new ProviderSessions(tequilapiClient)
  })

  describe('.addCountSubscriber', () => {
    it('does not invoke callback initially', async () => {
      const callbackMock = jest.fn()
      service.addCountSubscriber(callbackMock)

      expect(callbackMock).toBeCalledTimes(0)
    })

    it('starts notifying later', async () => {
      const callbackMock = jest.fn()
      service.addCountSubscriber(callbackMock)

      // give some time for ProviderSessions to see this change
      await nextTick()
      clock.runToLast()

      expect(callbackMock).toBeCalledTimes(1)
      expect(callbackMock).toBeCalledWith(1)
    })
  })

  describe('.removeCountSubscriber', () => {
    it('stops invoking callback on status change', async () => {
      const callbackMock = jest.fn()
      service.addCountSubscriber(callbackMock)
      service.removeCountSubscriber(callbackMock)

      // give some time for ProviderSessions to see this change
      await nextTick()
      clock.runToLast()

      expect(callbackMock).toBeCalledTimes(0)
    })
  })
})
