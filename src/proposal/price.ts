/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Tokens } from '../common/tokens'

export interface Price {
  currency: string
  perHour: number
  perGib: number
  perHourTokens: Tokens
  perGibTokens: Tokens
}

export enum Currency {
  MYST = 'MYST',
  MYSTTestToken = 'MYSTT',
}
