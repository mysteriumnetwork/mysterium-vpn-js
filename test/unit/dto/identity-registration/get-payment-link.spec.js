/*
 * Copyright (C) 2019 The "mysteriumnetwork/js-tequilapi" Authors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import IdentityRegistrationDTO from '../../../../src/dto/identity-registration/identity-registration'
import { getPaymentLink } from '../../../../src/dto/identity-registration/get-payment-link'

describe('.getPaymentLink', () => {
  it('generates valid payment link', () => {
    const identity = new IdentityRegistrationDTO({
      registered: false,
      publicKey: {
        part1: '0xfb22c62ed2ddc65eb2994a8af5b1094b239aacc04a6505fd2bc581f55547175a',
        part2: '0xef3156a0d95c3832b191c03c272a5900e3e30484b9c8a65a0387f1f8d436867f'
      },
      signature: {
        r: '0xb48616d33aba008f687d500cac9e9f2ca2b3c275fab6fc21318b81e09571d993',
        s: '0x49c0d7e1445389dbc805275f0aeb0b7f23e50e26a772b5a3bc4b2cc39f1bb3aa',
        v: 28
      }
    })
    const link = getPaymentLink('http://walletx.mysterium.network/', identity)
    expect(link).to.be.eql(
      'http://walletx.mysterium.network/' +
      '?part1=0xfb22c62ed2ddc65eb2994a8af5b1094b239aacc04a6505fd2bc581f55547175a' +
      '&part2=0xef3156a0d95c3832b191c03c272a5900e3e30484b9c8a65a0387f1f8d436867f' +
      '&r=0xb48616d33aba008f687d500cac9e9f2ca2b3c275fab6fc21318b81e09571d993' +
      '&s=0x49c0d7e1445389dbc805275f0aeb0b7f23e50e26a772b5a3bc4b2cc39f1bb3aa&v=28')
  })
})
