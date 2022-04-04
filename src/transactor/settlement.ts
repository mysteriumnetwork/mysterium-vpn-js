/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Pageable, PaginationQuery, parsePageable } from '../common/pageable'
import { validate } from '../fmt/validation'

export interface SettleRequest {
  hermesIds: string[]
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
  blockExplorerUrl: string
}

export enum SettlementType {
  Settlement = 'settlement',
  Withdrawal = 'withdrawal',
}

export interface SettlementListQuery extends PaginationQuery {
  dateFrom?: string
  dateTo?: string
  providerId?: string
  hermesId?: string
  types?: SettlementType[]
}

export interface SettlementStats {
  withdrawalTotal?: string
}

export type SettlementListResponse = Pageable<Settlement> & SettlementStats

export enum BeneficiaryTxState {
  COMPLETED = 'completed',
  PENDING = 'pending',
}

export interface BeneficiaryTxStatus {
  state: BeneficiaryTxState
  error: string
}

export const validateSettlementResponse = <T>(response: any): any => {
  validate('SettlementListResponse', response, { name: 'withdrawalTotal', type: 'string' })
  return parsePageable<T>(response)
}
