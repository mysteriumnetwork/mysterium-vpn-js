/*
 * Copyright (C) 2019 The "mysteriumnetwork/mysterium-vpn-js" Authors.
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

import { parsePublicKey, PublicKey } from './public-key'
import { parseSignature, Signature } from './signature'

export interface IdentityRegistration {
  registered: boolean
  publicKey?: PublicKey
  signature?: Signature
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseIdentityRegistration(data: any): IdentityRegistration {
  return {
    registered: data.registered,
    publicKey: data.publicKey ? parsePublicKey(data.publicKey) : undefined,
    signature: data.signature ? parseSignature(data.signature) : undefined,
  }
}
