/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { parseIdentityRef, parseIdentity } from './identity'

describe('TequilapiClient DTO', () => {
  describe('parse IdentityRef', () => {
    it('sets properties', async () => {
      const identity = parseIdentityRef({ id: '0xF000FACE' })

      expect(identity.id).toEqual('0xF000FACE')
    })

    it('throws when id is missing', async () => {
      expect(() => parseIdentityRef({})).toThrow()
    })
  })
})

describe('TequilapiClient DTO', () => {
  describe('parse Identity', () => {
    it('sets properties', () => {
      const identity = parseIdentity({
        id: '0x111',
        registrationStatus: 'Promoting',
        channelAddress: '0xCe93E5A58B20bF3204f8400918C9dd8D28471C8F',
        balance: 3888150908128711894,
        earnings: 0,
        earningsTotal: 2557762453645780,
        stake: 12000000000000000000,
      })

      expect(identity.id).toEqual('0x111')
      expect(identity.registrationStatus).toEqual('Promoting')
      expect(identity.channelAddress).toEqual('0xCe93E5A58B20bF3204f8400918C9dd8D28471C8F')
      expect(identity.balance).toEqual(3888150908128711894)
      expect(identity.earnings).toEqual(0)
      expect(identity.earningsTotal).toEqual(2557762453645780)
      expect(identity.stake).toEqual(12000000000000000000)
    })

    it('sets wrong properties', async () => {
      expect(() => parseIdentity('I am wrong')).toThrow()
    })
  })
})
