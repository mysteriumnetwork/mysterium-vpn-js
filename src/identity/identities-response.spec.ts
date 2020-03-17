/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { parseIdentityList } from './identity'

describe('TequilapiClient DTO', () => {
  describe('.parseIdentityList', () => {
    it('sets properties', async () => {
      const response = parseIdentityList({
        identities: [{ id: '0x1000FACE' }, { id: '0x2000FACE' }],
      })

      expect(response.identities).toHaveLength(2)
      expect(response.identities[0].id).toEqual('0x1000FACE')
      expect(response.identities[1].id).toEqual('0x2000FACE')
    })

    it('returns empty array when properties are empty', async () => {
      const response = parseIdentityList({})

      expect(response.identities).toEqual([])
    })

    it('returns empty array when properties are wrong', async () => {
      const response = parseIdentityList('I am wrong')

      expect(response.identities).toEqual([])
    })
  })
})
