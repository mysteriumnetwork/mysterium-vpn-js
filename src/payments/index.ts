/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface PaymentOrderRequest {
  lightningNetwork: boolean
  mystAmount: number
  payCurrency: string
}

export interface PaymentOrderResponse {
  id: number
  identity: string
  mystAmount: number
  payAmount: number
  payCurrency: string
  paymentAddress: string
  paymentUrl: string
  priceAmount: number
  priceCurrency: string
  receiveAmount: number
  receiveCurrency: string
  status: string
}

export interface PaymentOrderOptionsResponse {
  minimum: number
  suggested: number[]
}
