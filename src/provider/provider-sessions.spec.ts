/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import lolex, { InstalledClock, NodeClock } from 'lolex'
import { ServiceSession } from './service-session'
import { EmptyTequilapiClientMock } from '../test-utils/empty-tequilapi-client-mock'
import { nextTick } from '../test-utils/utils'
import { ProviderSessions } from './provider-sessions'

class ProviderServiceTequilapiClientMock extends EmptyTequilapiClientMock {
  public serviceSessionsMock: ServiceSession[] = [
    {
      id: 'id1',
      consumerId: '0x1',
      createdAt: '2019-01-01',
      bytesIn: 10,
      bytesOut: 11,
      tokensEarned: 1000,
    },
  ]

  public async serviceSessions(): Promise<ServiceSession[]> {
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
