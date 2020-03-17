/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ConnectionIp, parseConnectionIp } from './ip'

describe('TequilapiClient DTO', () => {
  describe('.parseConnectionIp', () => {
    it('sets properties', async () => {
      const model: ConnectionIp = parseConnectionIp({ ip: 'mock ip' })

      expect(model.ip).toEqual('mock ip')
    })

    it('sets empty properties', async () => {
      const model: ConnectionIp = parseConnectionIp({})

      expect(model.ip).toBeUndefined()
    })
  })
})
