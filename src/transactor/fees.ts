/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Tokens } from '../common/tokens'

export interface Fees {
  registration: number
  registrationTokens: Tokens
  settlement: number
  settlementTokens: Tokens
  hermes: number
  hermesTokens: Tokens
  decreaseStake: number
  decreaseStakeTokens: Tokens
}
