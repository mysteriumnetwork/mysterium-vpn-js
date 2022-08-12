/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Tokens } from '../common/tokens'

/**
 * @deprecated use v2 endpoint
 */
export interface Fees {
  registration: number
  registrationTokens: Tokens
  settlement: number
  settlementTokens: Tokens
  /**
   * @deprecated use hermesPercent
   */
  hermes: number
  hermesPercent: string
  decreaseStake: number
  decreaseStakeTokens: Tokens
}

export interface FeesV2 {
  registration: Tokens
  settlement: Tokens
  decreaseStake: Tokens
  validUntil: string
}

export interface FeesResponse {
  current: FeesV2
  last: FeesV2
  serverTime: string
  hermesPercent: string
}
