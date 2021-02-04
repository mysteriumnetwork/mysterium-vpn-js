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
  referralToken?: string
}

export interface IdentityRegistrationResponse {
  status: string
  registered: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseIdentityRegistrationResponse(data: any): IdentityRegistrationResponse {
  validateMultiple('IdentityRegistrationResponse', data, [
    { name: 'status', type: 'string' },
    { name: 'registered', type: 'boolean' },
  ])
  return data
}
