/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Pageable, PaginationQuery } from '../common/pageable'

export interface SettleRequest {
  hermesId: string
  providerId: string
}

export interface SettleWithBeneficiaryRequest extends SettleRequest {
  beneficiary: string
}

export interface DecreaseStakeRequest {
  id?: string
  amount?: number
  transactorFee?: number
}

export interface Settlement {
  txHash: string
  providerId: string
  hermesId: string
  channelAddress: string
  beneficiary: string
  amount: number
  fees: number
  settledAt: string
  isWithdrawal: boolean
}

export interface SettlementListQuery extends PaginationQuery {
  dateFrom?: string
  dateTo?: string
  providerId?: string
  hermesId?: string
}

export type SettlementListResponse = Pageable<Settlement>

export enum BeneficiaryTxState {
  COMPLETED = 'completed',
  PENDING = 'pending',
}

export interface BeneficiaryTxStatus {
  state: BeneficiaryTxState
  error: string
}
