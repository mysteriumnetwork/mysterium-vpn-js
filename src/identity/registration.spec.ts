/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IdentityRegistration, parseIdentityRegistration } from './registration'

describe('TequilapiClient DTO', () => {
  describe('.parseIdentityRegistration', () => {
    const checkUndefinedFields = (identity: IdentityRegistration) => {
      expect(identity.registered).toBeUndefined()
      expect(identity.publicKey).toBeUndefined()
      expect(identity.signature).toBeUndefined()
    }

    it('sets properties', () => {
      const identity = parseIdentityRegistration({
        registered: false,
        publicKey: {
          part1: '0xfb22c62ed2ddc65eb2994a8af5b1094b239aacc04a6505fd2bc581f55547175a',
          part2: '0xef3156a0d95c3832b191c03c272a5900e3e30484b9c8a65a0387f1f8d436867f',
        },
        signature: {
          r: '0xb48616d33aba008f687d500cac9e9f2ca2b3c275fab6fc21318b81e09571d993',
          s: '0x49c0d7e1445389dbc805275f0aeb0b7f23e50e26a772b5a3bc4b2cc39f1bb3aa',
          v: 28,
        },
      })

      expect(identity.registered).toBe(false)

      expect(identity.publicKey).toEqual({
        part1: '0xfb22c62ed2ddc65eb2994a8af5b1094b239aacc04a6505fd2bc581f55547175a',
        part2: '0xef3156a0d95c3832b191c03c272a5900e3e30484b9c8a65a0387f1f8d436867f',
      })

      expect(identity.signature).toEqual({
        r: '0xb48616d33aba008f687d500cac9e9f2ca2b3c275fab6fc21318b81e09571d993',
        s: '0x49c0d7e1445389dbc805275f0aeb0b7f23e50e26a772b5a3bc4b2cc39f1bb3aa',
        v: 28,
      })
    })

    it('sets empty properties', () => {
      const identity = parseIdentityRegistration({})
      checkUndefinedFields(identity)
    })

    it('sets wrong properties', () => {
      const identity = parseIdentityRegistration('I am wrong')
      checkUndefinedFields(identity)
    })
  })
})
