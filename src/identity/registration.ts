/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validateMultiple } from '../fmt/validation'

export interface IdentityRegisterRequest {
  stake?: number
  beneficiary?: string
  fee?: number
}

export interface IdentityRegistration {
  status: string
  registered: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseIdentityRegistration(data: any): IdentityRegistration {
  validateMultiple('IdentityRegistration', data, [
    { name: 'status', type: 'string' },
    { name: 'registered', type: 'boolean' },
  ])
  return data
}
