/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PublicKey } from './public-key'
import { Signature } from './signature'

export interface IdentityRegistration {
  registered: boolean
  publicKey?: PublicKey
  signature?: Signature
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseIdentityRegistration(data: any): IdentityRegistration {
  return data
}
