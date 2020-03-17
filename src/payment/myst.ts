/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Money } from './method'

export const MYST = 'MYST'

export const mystDisplay = (m: Money): number | undefined => {
  if (m.currency == MYST) {
    return Number((m.amount / 100000000).toFixed(6))
  }
  return undefined
}
