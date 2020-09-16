/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Pagination } from '../common/pagination'

export interface SettleRequest {
  hermesId: string
  providerId: string
}

export interface Settlement {
  txHash: string
  providerId: string
  hermesId: string
  channelAddress: string
  beneficiary: string
  amount: string
  settledAt: string
}

export interface SettlementListQuery {
  settledAtFrom?: string
  settledAtTo?: string
  providerId?: string
  hermesId?: string
  page?: number
  pageSize?: number
}

export interface SettlementListResponse {
  settlements: Settlement[]
  pagination: Pagination
}
