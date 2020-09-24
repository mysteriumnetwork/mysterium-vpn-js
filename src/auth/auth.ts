/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Pageable } from '../common/pageable'

export interface AuthRequest {
  username: string
  password: string
}

export interface AuthRequest {
  username: string
  password: string
}

export interface DecreaseStakeRequest {
  id?: string
  amount?: number
  transactorFee?: number
}

export interface Auth {
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

export type SettlementListResponse = Pageable<Auth>
