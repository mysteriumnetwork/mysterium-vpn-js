/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ConnectionStatus, parseConnectionStatusResponse } from './status'

describe('TequilapiClient DTO', () => {
  describe('.parseConnectionStatusResponse', () => {
    // TODO: fix
    xit('sets properties', async () => {
      const connection = parseConnectionStatusResponse({
        status: 'Connected',
        sessionId: 'My-super-session',
      })

      expect(connection.status).toEqual(ConnectionStatus.CONNECTED)
      expect(connection.sessionId).toEqual('My-super-session')
    })

    it('fails when status is missing', () => {
      expect(() => parseConnectionStatusResponse({ sessionId: 'My-super-session' })).toThrow()
    })
  })
})
