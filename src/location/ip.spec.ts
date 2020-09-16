/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IP, parseIP } from './ip'

describe('TequilapiClient DTO', () => {
  describe('.parseIP', () => {
    it('sets properties', async () => {
      const model: IP = parseIP({ ip: 'mock ip' })

      expect(model.ip).toEqual('mock ip')
    })

    it('sets empty properties', async () => {
      const model: IP = parseIP({})

      expect(model.ip).toBeUndefined()
    })
  })
})
