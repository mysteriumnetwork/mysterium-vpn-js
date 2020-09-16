/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { parseIdentityBeneficiaryResponse } from './beneficiary'

describe('TequilapiClient DTO', () => {
  describe('.parseIdentityBeneficiaryResponse', () => {
    it('sets properties', async () => {
      // eslint-disable-next-line @typescript-eslint/camelcase
      const response = parseIdentityBeneficiaryResponse({
        beneficiary: '0xF000FACE',
      })
      expect(response.beneficiary).toEqual('0xF000FACE')
    })

    it('throws when eth address is missing', async () => {
      expect(() => parseIdentityBeneficiaryResponse({})).toThrow()
    })
  })
})
