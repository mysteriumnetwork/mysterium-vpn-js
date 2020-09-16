/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export interface MMNApiKeyResponse {
  api_key: string
}

export interface MMNReportResponse {
  country?: string
  identity: string
  name?: string
  report?: MMNReport
  whitelisted: boolean
}

export interface MMNReport {
  balanceTokens: number
  balanceUsd: number
  earningTokens: number
  earningUsd: number
  position: number
  positionPerCountry: number
}
