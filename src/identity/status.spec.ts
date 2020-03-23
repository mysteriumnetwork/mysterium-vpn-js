/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { parseIdentityStatus } from './status'

describe('TequilapiClient DTO', () => {
  describe('.parseIdentityStatus', () => {
    it('sets properties', () => {
      const identity = parseIdentityStatus({
        registrationStatus: 'Promoting',
        channelAddress: '0xCe93E5A58B20bF3204f8400918C9dd8D28471C8F',
        balance: 12376699336,
        balanceEstimate: 12376699336,
        earnings: 0,
        earningsTotal: 2557762453645780,
      })

      expect(identity.registrationStatus).toEqual('Promoting')
      expect(identity.channelAddress).toEqual('0xCe93E5A58B20bF3204f8400918C9dd8D28471C8F')
      expect(identity.balance).toEqual(12376699336)
      expect(identity.balanceEstimate).toEqual(12376699336)
      expect(identity.earnings).toEqual(0)
      expect(identity.earningsTotal).toEqual(2557762453645780)
    })

    it('sets wrong properties', async () => {
      expect(() => parseIdentityStatus('I am wrong')).toThrow()
    })
  })
})
