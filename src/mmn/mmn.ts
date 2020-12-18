/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export interface MMNApiKeyResponse {
  apiKey: string
}

export interface MMNReportResponse {
  id: number
  identity: string
  name?: string
  country?: string
  whitelisted?: boolean
  report?: MMNReport
}

export interface MMNReport {
  positionResidentialEligible: boolean
  positionResidential: number
  balanceResidentialTokens: string
  balanceResidentialUsd: number

  positionGlobalEligible: boolean
  positionGlobal: number
  balanceGlobalTokens: string
  balanceGlobalUsd: number
}
