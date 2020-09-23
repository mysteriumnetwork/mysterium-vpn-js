/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { displayMoney } from './money-formater'
import { Currency } from '..'

describe('displayMoney', () => {
  it('must space amount ant currency', () => {
    expect(
      displayMoney(
        {
          amount: 0,
          currency: Currency.MYST,
        },
        { showCurrency: true }
      )
    ).toBe('0 MYST')
  })
})
