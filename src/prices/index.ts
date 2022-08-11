/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Tokens } from '../common/tokens'

export interface CurrentPricesResponse {
  /**
   * @deprecated
   */
  pricePerHour: bigint
  /**
   * @deprecated
   */
  pricePerGib: bigint

  pricePerHourTokens: Tokens
  pricePerGibTokens: Tokens
}

export interface CurrentPricesV2Response {
  serviceType: string
  pricePerHourTokens: Tokens
  pricePerGibTokens: Tokens
}
