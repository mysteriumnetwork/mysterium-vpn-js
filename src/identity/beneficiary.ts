/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validate } from '../fmt/validation'

export interface IdentityBeneficiaryResponse {
  beneficiary: string
}

export function parseIdentityBeneficiaryResponse(data: any): IdentityBeneficiaryResponse {
  validate('IdentityBeneficiaryResponse', data, { name: 'beneficiary', type: 'string' })
  return data
}
