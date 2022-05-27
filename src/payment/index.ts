/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { HttpInterface } from '../http/interface'

export interface Money {
  amount: number
  currency: string
}

export interface PaymentGateway {
  currencies: string[]
  name: string
  orderOptions: {
    minimum: number
    suggested: number[]
  }
}

export interface CreatePaymentOrderRequest {
  mystAmount?: string
  amountUsd?: string
  payCurrency: string
  country: string
  projectId?: string
  gatewayCallerData: {
    country?: string
    lightningNetwork?: boolean
  }
}

export interface PaymentOrder {
  id: string
  status: string
  identity: string
  gatewayName: string
  receiveMyst: string
  payAmount: string
  payCurrency: string
  country: string

  currency: string
  itemsSubTotal: string
  taxRate: string
  taxSubTotal: string
  orderTotal: string

  publicGatewayData?: {
    secureForm?: string
    createdAt?: Date
    expireAt?: Date
    lightningNetwork?: boolean
    paymentAddress?: string
    paymentUrl?: string
  }
}

export interface RegistrationPaymentResponse {
  paid: boolean
}

export class PaymentAPI {
  private http: HttpInterface
  constructor(http: HttpInterface) {
    this.http = http
  }

  public async gateways(optionsCurrency = 'MYST'): Promise<PaymentGateway[]> {
    return await this.http.get('/v2/payment-order-gateways', { optionsCurrency })
  }

  public async createOrder(
    id: string,
    gateway: string,
    req: CreatePaymentOrderRequest
  ): Promise<PaymentOrder> {
    return await this.http.post(`/v2/identities/${id}/${gateway}/payment-order`, req)
  }

  public async orders(id: string): Promise<PaymentOrder[]> {
    return await this.http.get(`/v2/identities/${id}/payment-order`)
  }

  public async order(id: string, orderId: string): Promise<PaymentOrder> {
    return await this.http.get(`/v2/identities/${id}/payment-order/${orderId}`)
  }

  public async invoice(id: string, orderId: string): Promise<any> {
    return await this.http.getFile(`/v2/identities/${id}/payment-order/${orderId}/invoice`)
  }

  public async registrationPayment(id: string): Promise<RegistrationPaymentResponse> {
    return this.http.get(`/v2/identities/${id}/registration-payment`)
  }
}
