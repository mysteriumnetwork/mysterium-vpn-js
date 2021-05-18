/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Price } from '../proposal/price'

export interface ServiceStartRequest {
  providerId: string
  type: string
  options?: { [key: string]: any }
  price?: Price
  accessPolicies?: {
    ids: string[]
  }
}
