/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { parseIdentity } from './identity'

describe('TequilapiClient DTO', () => {
  describe('.parseIdentity', () => {
    it('sets properties', async () => {
      const identity = parseIdentity({ id: '0xF000FACE' })

      expect(identity.id).toEqual('0xF000FACE')
    })

    it('throws when id is missing', async () => {
      expect(() => parseIdentity({})).toThrow()
    })
  })
})
