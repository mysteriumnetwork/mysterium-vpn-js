/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { validate } from '../fmt/validation'

export interface NatTypeResponse {
  type: string
  error?: string
}

export function parseNatTypeResponse(data: any): NatTypeResponse {
  validate('NatStatusResponse', data, { name: 'type', type: 'string' })
  if (data.error) {
    validate('NatStatusResponse', data, { name: 'error', type: 'string' })
  }
  return data
}
