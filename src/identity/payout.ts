/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { validate } from '../fmt/validation'

export interface Payout {
  address: string
}

export const parsePayoutAddressResponse = (data: any): Payout => {
  validate('Payout', data, { name: 'address', type: 'string' })
  return data
}
