/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validateMultiple } from '../fmt/validation'

export interface IdentityPayout {
  ethAddress: string
  referralCode: string
  email: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseIdentityPayout(data: any): IdentityPayout {
  validateMultiple('IdentityPayout', data, [
    { name: 'ethAddress', type: 'string' },
    { name: 'referralCode', type: 'string' },
    { name: 'email', type: 'string' },
  ])
  return data
}
