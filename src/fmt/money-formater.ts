/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Money } from '../payment'
import { Currency } from '../proposal/price'

export interface DisplayMoneyOptions {
  showCurrency?: boolean
  fractionDigits?: number
  removeInsignificantZeros?: boolean
  decimalPart?: number
}

export const DECIMAL_PART = 1_000_000_000_000_000_000

const displayedCurrency = (currency: string, showCurrency?: boolean): string => {
  return showCurrency ? ` ${currency}` : ''
}

/**
 * @deprecated For every token value, use *Tokens field and display it using Tokens.Human.
 */
export const displayMoney = (
  m: Money,
  {
    showCurrency = false,
    fractionDigits = 6,
    removeInsignificantZeros = true,
    decimalPart = DECIMAL_PART,
  }: DisplayMoneyOptions = {}
): string => {
  if (m.currency == Currency.MYST || m.currency == Currency.MYSTTestToken) {
    let amount = m.amount ?? 0
    amount = amount / decimalPart // adjust
    let amountStr = amount.toFixed(fractionDigits) // fractions
    if (removeInsignificantZeros) {
      amountStr = Number(amountStr).toString()
    }
    return `${amountStr}${displayedCurrency(m.currency, showCurrency)}`
  }
  return `${m.amount}${displayedCurrency(m.currency, showCurrency)}`
}
