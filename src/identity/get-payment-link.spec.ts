/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getPaymentLink } from './get-payment-link'
import { IdentityProof } from './proof'

describe('.getPaymentLink', () => {
  it('generates valid payment link', () => {
    const proof: IdentityProof = {
      publicKey: {
        part1: '0xfb22c62ed2ddc65eb2994a8af5b1094b239aacc04a6505fd2bc581f55547175a',
        part2: '0xef3156a0d95c3832b191c03c272a5900e3e30484b9c8a65a0387f1f8d436867f',
      },
      signature: {
        r: '0xb48616d33aba008f687d500cac9e9f2ca2b3c275fab6fc21318b81e09571d993',
        s: '0x49c0d7e1445389dbc805275f0aeb0b7f23e50e26a772b5a3bc4b2cc39f1bb3aa',
        v: '28',
      },
    }
    const link = getPaymentLink('http://walletx.mysterium.network/', proof)
    expect(link).toEqual(
      'http://walletx.mysterium.network/' +
        '?part1=0xfb22c62ed2ddc65eb2994a8af5b1094b239aacc04a6505fd2bc581f55547175a' +
        '&part2=0xef3156a0d95c3832b191c03c272a5900e3e30484b9c8a65a0387f1f8d436867f' +
        '&r=0xb48616d33aba008f687d500cac9e9f2ca2b3c275fab6fc21318b81e09571d993' +
        '&s=0x49c0d7e1445389dbc805275f0aeb0b7f23e50e26a772b5a3bc4b2cc39f1bb3aa&v=28'
    )
  })
})
