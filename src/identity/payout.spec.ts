/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { parseIdentityPayout } from './payout'

describe('TequilapiClient DTO', () => {
  describe('.parseIdentityPayout', () => {
    it('sets properties', async () => {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const identity = parseIdentityPayout({
        ethAddress: '0xF000FACE',
        referralCode: 'ABC1234',
        email: '',
      })

      expect(identity.ethAddress).toEqual('0xF000FACE')
      expect(identity.referralCode).toEqual('ABC1234')
    })

    it('throws when eth address is missing', async () => {
      expect(() => parseIdentityPayout({})).toThrow()
    })
  })
})
