/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validateMultiple } from '../fmt/validation'

export interface IdentityStatus {
  registrationStatus: string
  channelAddress: string
  balance: number
  balanceEstimate: number
  earnings: number
  earningsTotal: number
}

export function parseIdentityStatus(data: any): IdentityStatus {
  validateMultiple('IdentityStatus', data, [
    { name: 'registrationStatus', type: 'string' },
    { name: 'channelAddress', type: 'string' },
    { name: 'balance', type: 'number' },
    { name: 'balanceEstimate', type: 'number' },
    { name: 'earnings', type: 'number' },
    { name: 'earningsTotal', type: 'number' },
  ])
  return data
}
