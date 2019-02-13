/*
 * Copyright (C) 2017 The "mysteriumnetwork/mysterium-vpn" Authors.
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

// @flow

const getPaymentLink = (paymentBaseUrl: string, registration: IdentityProof): string => {
  const { publicKey, signature } = registration
  return paymentBaseUrl +
    `?part1=${publicKey.part1}&part2=${publicKey.part2}` +
    `&r=${signature.r}&s=${signature.s}&v=${signature.v}`
}

class PublicKeyDTO {
  part1: string
  part2: string

  constructor (data: { part1: string, part2: string }) {
    this.part1 = data.part1
    this.part2 = data.part2
  }
}

class SignatureDTO {
  r: string
  s: string
  v: string

  constructor (data: { r: string, s: string, v: string }) {
    this.r = data.r
    this.s = data.s
    this.v = data.v
  }
}

type IdentityProof = {
  publicKey: PublicKeyDTO,
  signature: SignatureDTO
}

class IdentityRegistrationDTO {
  registered: boolean
  publicKey: ?PublicKeyDTO
  signature: ?SignatureDTO

  constructor (data: { registered: boolean, publicKey: ?PublicKeyDTO, signature: ?SignatureDTO }) {
    this.registered = data.registered
    this.publicKey = data.publicKey ? new PublicKeyDTO(data.publicKey) : null
    this.signature = data.signature ? new SignatureDTO(data.signature) : null
  }
}

export { PublicKeyDTO, SignatureDTO, getPaymentLink }
export default IdentityRegistrationDTO
