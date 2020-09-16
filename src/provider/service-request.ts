/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface ServiceStartRequest {
  providerId: string
  type: string
  options?: { [key: string]: any }
  paymentMethod?: ServicePaymentMethod
  accessPolicies?: {
    ids: string[]
  }
}

export interface ServicePaymentMethod {
  priceGb?: number
  priceMinute?: number
}
