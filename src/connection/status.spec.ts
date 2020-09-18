/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ConnectionStatus, parseConnectionInfo } from './status'

describe('TequilapiClient DTO', () => {
  describe('.parseConnectionInfo', () => {
    // TODO: fix
    xit('sets properties', async () => {
      const connection = parseConnectionInfo({
        status: 'Connected',
        sessionId: 'My-super-session',
      })

      expect(connection.status).toEqual(ConnectionStatus.CONNECTED)
      expect(connection.sessionId).toEqual('My-super-session')
    })

    it('fails when status is missing', () => {
      expect(() => parseConnectionInfo({ sessionId: 'My-super-session' })).toThrow()
    })
  })
})
