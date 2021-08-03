/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

import { MMNApiKeyResponse } from '../mmn/mmn'
import { Issue, IssueId } from '../feedback/issue'
import { Config } from '../config/config'
import { AccessPolicy } from '../access-policy/access-policy'
import { IP } from '../location/ip'
import { ConnectionRequest } from '../connection/request'
import { ConnectionStatistics } from '../connection/statistics'
import { ConnectionInfo } from '../connection/status'
import { Location } from '../location/location'
import { NodeHealthcheck } from '../daemon/healthcheck'
import { Identity, IdentityRef } from '../identity/identity'
import { IdentityRegisterRequest, IdentityRegistrationResponse } from '../identity/registration'
import { NatStatusResponse } from '../nat/status'
import { Proposal, ProposalQuery } from '../proposal/proposal'
import { ServiceInfo } from '../provider/service-info'
import { ServiceStartRequest } from '../provider/service-request'
import {
  SessionListQuery,
  SessionListResponse,
  SessionQuery,
  SessionStatsAggregatedResponse,
  SessionStatsDailyResponse,
} from '../session/session'
import { TequilapiClient } from '../tequilapi-client'
import { Fees } from '../transactor/fees'
import {
  BeneficiaryTxStatus,
  DecreaseStakeRequest,
  SettlementListQuery,
  SettlementListResponse,
  SettleRequest,
  SettleWithBeneficiaryRequest,
} from '../transactor/settlement'
import { IdentityCurrentRequest } from '../identity/selection'
import { IdentityBeneficiaryResponse } from '../identity/beneficiary'
import { AuthRequest, AuthResponse, ChangePasswordRequest } from '../auth/auth'
import {
  Money,
  PaymentOrderOptionsResponse,
  PaymentOrderRequest,
  PaymentOrderResponse,
} from '../payment'
import { Terms, TermsRequest } from '../daemon/terms'
import { ReferralTokenResponse } from '../referral'
import { FilterPresetsResponse } from '../proposal/filter-preset'
<<<<<<< Updated upstream
import { CurrentPricesResponse } from '../prices'
import { Payout } from '../identity/payout'
||||||| constructed merge base
=======
import { EntertainmentEstimateQuery, EntertainmentEstimateResponse } from '../payment/entertainment'
>>>>>>> Stashed changes

export class EmptyTequilapiClientMock implements TequilapiClient {
  public connectionCancel(): Promise<void> {
    throw Error('Not implemented')
  }

  public connectionCreate(request: ConnectionRequest, timeout?: number): Promise<ConnectionInfo> {
    throw Error('Not implemented')
  }

  public connectionIp(timeout?: number): Promise<IP> {
    throw Error('Not implemented')
  }

  public connectionLocation(): Promise<Location> {
    throw Error('Not implemented')
  }

  public connectionStatistics(): Promise<ConnectionStatistics> {
    throw Error('Not implemented')
  }

  public connectionStatus(): Promise<ConnectionInfo> {
    throw Error('Not implemented')
  }

  public findProposals(options?: ProposalQuery): Promise<Proposal[]> {
    throw Error('Not implemented')
  }

  public pricesCurrent(): Promise<CurrentPricesResponse> {
    throw Error('Not implemented')
  }

  public healthCheck(timeout?: number): Promise<NodeHealthcheck> {
    throw Error('Not implemented')
  }

  public identityList(): Promise<IdentityRef[]> {
    throw Error('Not implemented')
  }

  public identity(id: string): Promise<Identity> {
    throw Error('Not implemented')
  }

  public identityCreate(passphrase: string): Promise<IdentityRef> {
    throw Error('Not implemented')
  }

  public identityRegister(id: string, request?: IdentityRegisterRequest): Promise<void> {
    throw Error('Not implemented')
  }

  public identityRegistration(id: string): Promise<IdentityRegistrationResponse> {
    throw Error('Not implemented')
  }

  public identityBeneficiary(id: string): Promise<IdentityBeneficiaryResponse> {
    throw Error('Not implemented')
  }

  public identityUnlock(id: string, passphrase: string, timeout?: number): Promise<void> {
    throw Error('Not implemented')
  }

  public location(timeout?: number): Promise<Location> {
    throw Error('Not implemented')
  }

  public natStatus(): Promise<NatStatusResponse> {
    throw new Error('Not implemented')
  }

  public serviceGet(serviceId: string): Promise<ServiceInfo> {
    throw Error('Not implemented')
  }

  public serviceList(): Promise<ServiceInfo[]> {
    throw Error('Not implemented')
  }

  public serviceStart(request: ServiceStartRequest, timeout?: number): Promise<ServiceInfo> {
    throw Error('Not implemented')
  }

  public serviceStop(serviceId: string): Promise<void> {
    throw Error('Not implemented')
  }

  public sessions(query?: SessionListQuery): Promise<SessionListResponse> {
    throw Error('Not implemented')
  }

  public sessionStatsAggregated(query?: SessionQuery): Promise<SessionStatsAggregatedResponse> {
    throw Error('Not implemented')
  }

  public sessionStatsDaily(query?: SessionQuery): Promise<SessionStatsDailyResponse> {
    throw Error('Not implemented')
  }

  public stop(): Promise<void> {
    throw Error('Not implemented')
  }

  public accessPolicies(): Promise<AccessPolicy[]> {
    throw Error('Not implemented')
  }

  public identityCurrent(request: IdentityCurrentRequest): Promise<IdentityRef> {
    throw Error('Not implemented')
  }

  public payoutAddressSave(id: string, address: string): Promise<Payout> {
    throw Error('Not implemented')
  }

  public payoutAddressGet(id: string): Promise<Payout> {
    throw Error('Not implemented')
  }

  public authSetToken(token: string): void {
    throw Error('Not implemented')
  }

  public authAuthenticate(request: AuthRequest, useToken = true): Promise<AuthResponse> {
    throw Error('Not implemented')
  }

  public authLogin(request: AuthRequest): Promise<AuthResponse> {
    throw Error('Not implemented')
  }

  public authLogout(): Promise<void> {
    throw Error('Not implemented')
  }

  public authChangePassword(request: ChangePasswordRequest): Promise<void> {
    throw Error('Not implemented')
  }

  public async terms(): Promise<Terms> {
    throw Error('Not implemented')
  }

  public async termsUpdate(request: TermsRequest): Promise<void> {
    throw Error('Not implemented')
  }

  public config(): Promise<Config> {
    throw Error('Not implemented')
  }

  public defaultConfig(): Promise<Config> {
    throw Error('Not implemented')
  }

  public userConfig(): Promise<Config> {
    throw Error('Not implemented')
  }

  public updateUserConfig(config: Config): Promise<Config> {
    throw Error('Not implemented')
  }

  public reportIssue(issue: Issue, timeout?: number): Promise<IssueId> {
    throw Error('Not implemented')
  }

  public transactorFees(): Promise<Fees> {
    throw Error('Not implemented')
  }

  public settleSync(request: SettleRequest): Promise<void> {
    throw Error('Not implemented')
  }

  public settleAsync(request: SettleWithBeneficiaryRequest): Promise<void> {
    throw Error('Not implemented')
  }

  public settleWithBeneficiary(request: SettleWithBeneficiaryRequest): Promise<void> {
    throw Error('Not implemented')
  }

  beneficiaryTxStatus(id: string): Promise<BeneficiaryTxStatus> {
    throw Error('Not implemented')
  }

  public settleIntoStakeSync(request: SettleRequest): Promise<void> {
    throw Error('Not implemented')
  }

  public settleIntoStakeAsync(request: SettleRequest): Promise<void> {
    throw Error('Not implemented')
  }

  public decreaseStake(request: DecreaseStakeRequest): Promise<void> {
    throw Error('Not implemented')
  }

  public settlementHistory(query?: SettlementListQuery): Promise<SettlementListResponse> {
    throw Error('Not implemented')
  }

  public getMMNNodeReport(): Promise<any> {
    throw Error('Not implemented')
  }

  public setMMNApiKey(apiKey: string): Promise<any> {
    throw Error('Not implemented')
  }

  public getMMNApiKey(): Promise<MMNApiKeyResponse> {
    throw Error('Not implemented')
  }

  public clearMMNApiKey(): Promise<void> {
    throw Error('Not implemented')
  }

  public createPaymentOrder(
    identity: string,
    request: PaymentOrderRequest
  ): Promise<PaymentOrderResponse> {
    throw Error('Not implemented')
  }

  public getPaymentOrders(identity: string): Promise<PaymentOrderResponse[]> {
    throw Error('Not implemented')
  }

  public getPaymentOrder(identity: string, orderId: number): Promise<PaymentOrderResponse> {
    throw Error('Not implemented')
  }

  public getPaymentOrderOptions(): Promise<PaymentOrderOptionsResponse> {
    throw Error('Not implemented')
  }
  public getPaymentOrderCurrencies(): Promise<string[]> {
    throw Error('Not implemented')
  }

  public async getReferralToken(identity: string): Promise<ReferralTokenResponse> {
    throw Error('Not implemented')
  }

  public async exchangeRate(quoteCurrency?: string): Promise<Money> {
    throw Error('Not implemented')
  }

  public async estimateEntertainment(
    query: EntertainmentEstimateQuery
  ): Promise<EntertainmentEstimateResponse> {
    throw new Error('Not implemented.')
  }

  public async proposalFilterPresets(): Promise<FilterPresetsResponse> {
    throw Error('Not implemented')
  }
}
