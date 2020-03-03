/*
 * Copyright (C) 2020 The "mysteriumnetwork/mysterium-vpn-js" Authors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

export enum PaymentMethodType {
  BytesWithTime = 'BYTES_TRANSFERRED_WITH_TIME',
  Unsupported = 'UNSUPPORTED',
}

export interface Money {
  amount: number
  currency: string
}

export interface PaymentMethod {
  type: PaymentMethodType
  price: Money
  rate: {
    perSeconds: number
    perBytes: number
  }
}

export const pricePerMinute = (pm: PaymentMethod): Money => {
  if (!pm.rate.perSeconds) {
    return { amount: 0, currency: pm.price.currency }
  }
  return {
    amount: (60 / pm.rate.perSeconds) * pm.price.amount,
    currency: pm.price.currency,
  }
}

const bytesInGiB = 1024 * 1024 * 1024

export const pricePerGiB = (pm: PaymentMethod): Money => {
  if (!pm.rate.perBytes) {
    return { amount: 0, currency: pm.price.currency }
  }
  return {
    amount: (bytesInGiB / pm.rate.perBytes) * pm.price.amount,
    currency: pm.price.currency,
  }
}
