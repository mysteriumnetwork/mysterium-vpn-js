/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MMNApiKeyResponse, MMNReportResponse } from './mmn/mmn'
import { Issue, IssueId } from './feedback/issue'
import { Config } from './config/config'
import { AccessPolicy, parseAccessPolicyList } from './access-policy/access-policy'
import { ConnectionRequest } from './connection/request'
import { ConnectionInfo, parseConnectionInfo } from './connection/status'
import { IP, parseIP } from './location/ip'
import { ConnectionStatistics, parseConnectionStatistics } from './connection/statistics'
import { Location, parseLocation } from './location/location'
import { NodeHealthcheck, parseHealthcheckResponse } from './daemon/healthcheck'
import { Terms, TermsRequest } from './daemon/terms'
import { HttpInterface } from './http/interface'
import { TIMEOUT_DISABLED } from './http/timeouts'
import { parsePageable } from './common/pageable'
import {
  Identity,
  IdentityRef,
  parseIdentity,
  parseIdentityList,
  parseIdentityRef,
} from './identity/identity'
import { IdentityPayout, parseIdentityPayout } from './identity/payout'
import {
  IdentityRegisterRequest,
  IdentityRegistrationResponse,
  parseIdentityRegistrationResponse,
} from './identity/registration'
import {
  IdentityBeneficiaryResponse,
  parseIdentityBeneficiaryResponse,
} from './identity/beneficiary'
import { NatStatusResponse, parseNatStatusResponse } from './nat/status'
import { parseProposalList, Proposal, ProposalQuery } from './proposal/proposal'
import { ProposalMetrics } from './proposal/metrics'
import { parseServiceInfo, parseServiceListResponse, ServiceInfo } from './provider/service-info'
import { ServiceStartRequest } from './provider/service-request'
import {
  parseSessionListResponse,
  parseSessionStatsAggregatedResponse,
  parseSessionStatsDailyResponse,
  SessionListQuery,
  SessionListResponse,
  SessionQuery,
  SessionStatsAggregatedResponse,
  SessionStatsDailyResponse,
} from './session/session'
import { Fees } from './transactor/fees'
import {
  SettleRequest,
  SettleWithBeneficiaryRequest,
  DecreaseStakeRequest,
  SettlementListQuery,
  SettlementListResponse,
  Settlement,
} from './transactor/settlement'
import { IdentityCurrentRequest } from './identity/selection'
import { AuthRequest, AuthResponse, ChangePasswordRequest } from './auth/auth'
import { PaymentOrderOptionsResponse, PaymentOrderRequest, PaymentOrderResponse } from './payments'

export const TEQUILAPI_URL = 'http://127.0.0.1:4050'
export const pathConfig = 'config'
export const pathConfigUser = 'config/user'
export const pathConfigDefault = 'config/default'

export interface TequilapiClient {
  healthCheck(timeout?: number): Promise<NodeHealthcheck>
  natStatus(): Promise<NatStatusResponse>
  stop(): Promise<void>
  location(timeout?: number): Promise<Location>

  terms(): Promise<Terms>
  termsUpdate(request: TermsRequest): Promise<void>

  config(): Promise<Config>
  defaultConfig(): Promise<Config>
  userConfig(): Promise<Config>
  updateUserConfig(config: Config): Promise<Config>

  identityList(): Promise<IdentityRef[]>
  identityCurrent(request: IdentityCurrentRequest): Promise<IdentityRef>
  identityCreate(passphrase: string): Promise<IdentityRef>
  identityUnlock(id: string, passphrase: string, timeout?: number): Promise<void>
  identityRegister(id: string, request?: IdentityRegisterRequest): Promise<void>
  identity(id: string): Promise<Identity>
  identityRegistration(id: string): Promise<IdentityRegistrationResponse>
  identityBeneficiary(id: string): Promise<IdentityBeneficiaryResponse>
  identityPayout(id: string): Promise<IdentityPayout>
  updateIdentityPayout(id: string, ethAddress: string): Promise<void>
  updateEmail(id: string, email: string): Promise<void>
  updateReferralCode(id: string, referralCode: string): Promise<void>

  authSetToken(token: string): void
  authAuthenticate(request: AuthRequest, useToken: true): Promise<AuthResponse>
  authLogin(request: AuthRequest): Promise<AuthResponse>
  authLogout(): Promise<void>
  authChangePassword(request: ChangePasswordRequest): Promise<void>

  findProposals(options?: ProposalQuery): Promise<Proposal[]>
  proposalsQuality(): Promise<ProposalMetrics[]>

  reportIssue(issue: Issue, timeout?: number): Promise<IssueId>

  connectionCreate(request: ConnectionRequest, timeout?: number): Promise<ConnectionInfo>
  connectionStatus(): Promise<ConnectionInfo>
  connectionCancel(): Promise<void>
  connectionIp(timeout?: number): Promise<IP>
  connectionStatistics(): Promise<ConnectionStatistics>
  connectionLocation(): Promise<Location>

  serviceList(): Promise<ServiceInfo[]>
  serviceGet(serviceId: string): Promise<ServiceInfo>
  serviceStart(request: ServiceStartRequest, timeout?: number): Promise<ServiceInfo>
  serviceStop(serviceId: string): Promise<void>

  sessions(query?: SessionListQuery): Promise<SessionListResponse>
  sessionStatsAggregated(query?: SessionQuery): Promise<SessionStatsAggregatedResponse>
  sessionStatsDaily(query?: SessionQuery): Promise<SessionStatsDailyResponse>
  accessPolicies(): Promise<AccessPolicy[]>

  transactorFees(): Promise<Fees>
  settleSync(request: SettleRequest): Promise<void>
  settleAsync(request: SettleRequest): Promise<void>
  settleWithBeneficiary(request: SettleWithBeneficiaryRequest): Promise<void>
  settleIntoStakeSync(request: SettleRequest): Promise<void>
  settleIntoStakeAsync(request: SettleRequest): Promise<void>
  decreaseStake(request: DecreaseStakeRequest): Promise<void>
  settlementHistory(query?: SettlementListQuery): Promise<SettlementListResponse>

  getMMNNodeReport(): Promise<MMNReportResponse>
  setMMNApiKey(apiKey: string): Promise<void>
  getMMNApiKey(): Promise<MMNApiKeyResponse>
  clearMMNApiKey(): Promise<void>

  createPaymentOrder(identity: string, request: PaymentOrderRequest): Promise<PaymentOrderResponse>
  getPaymentOrders(identity: string): Promise<PaymentOrderResponse[]>
  getPaymentOrder(identity: string, orderId: number): Promise<PaymentOrderResponse>
  getPaymentOrderOptions(): Promise<PaymentOrderOptionsResponse>
  getPaymentOrderCurrencies(): Promise<string[]>
}

export class HttpTequilapiClient implements TequilapiClient {
  public http: HttpInterface

  public constructor(http: HttpInterface) {
    this.http = http
  }

  public async healthCheck(timeout?: number): Promise<NodeHealthcheck> {
    const response = await this.http.get('healthcheck', undefined, timeout)
    if (!response) {
      throw new Error('Healthcheck response body is missing')
    }
    return parseHealthcheckResponse(response)
  }

  public async terms(): Promise<Terms> {
    const response = await this.http.get('terms')
    if (!response) {
      throw new Error('Terms response body is missing')
    }

    return response
  }

  public async termsUpdate(request: TermsRequest): Promise<void> {
    await this.http.post('terms', request)
  }

  public async natStatus(): Promise<NatStatusResponse> {
    const response = await this.http.get('nat/status')
    return parseNatStatusResponse(response)
  }

  public async stop(): Promise<void> {
    await this.http.post('stop')
  }

  public async location(timeout?: number): Promise<Location> {
    const response = await this.http.get('location', undefined, timeout)
    if (!response) {
      throw new Error('ServiceLocation response body is missing')
    }
    return parseLocation(response)
  }

  public async identityList(): Promise<IdentityRef[]> {
    const response = await this.http.get('identities')
    if (!response) {
      throw new Error('Identity list response body is missing')
    }
    const responseDto = parseIdentityList(response)

    return responseDto.identities
  }

  public async identity(id: string): Promise<Identity> {
    const response = await this.http.get(`identities/${id}`)
    if (!response) {
      throw new Error('Identity response body is missing')
    }
    return parseIdentity(response)
  }

  public async identityCurrent(request: IdentityCurrentRequest): Promise<IdentityRef> {
    const response = await this.http.put('identities/current', request)

    if (!response) {
      throw new Error('Identity response body is missing')
    }

    return parseIdentityRef(response)
  }

  public async identityCreate(passphrase: string): Promise<IdentityRef> {
    const response = await this.http.post('identities', { passphrase })
    if (!response) {
      throw new Error('Identity creation response body is missing')
    }
    return parseIdentityRef(response)
  }

  public async identityUnlock(id: string, passphrase: string, timeout?: number): Promise<void> {
    await this.http.put('identities/' + id + '/unlock', { passphrase }, timeout)
  }

  public async identityRegister(id: string, request?: IdentityRegisterRequest): Promise<void> {
    return await this.http.post(`identities/${id}/register`, request ?? {})
  }

  public async identityRegistration(id: string): Promise<IdentityRegistrationResponse> {
    const response = await this.http.get(`identities/${id}/registration`)
    if (!response) {
      throw new Error('Identity registration response body is missing')
    }
    return parseIdentityRegistrationResponse(response)
  }

  public async identityBeneficiary(id: string): Promise<IdentityBeneficiaryResponse> {
    const response = await this.http.get(`identities/${id}/beneficiary`)
    if (!response) {
      throw new Error('Identity registration response body is missing')
    }
    return parseIdentityBeneficiaryResponse(response)
  }

  public async identityPayout(id: string): Promise<IdentityPayout> {
    const response = await this.http.get(`identities/${id}/payout`)
    if (!response) {
      throw new Error('Identity payout response body is missing')
    }
    return parseIdentityPayout(response)
  }

  public async updateIdentityPayout(id: string, ethAddress: string): Promise<void> {
    await this.http.put(`identities/${id}/payout`, { ethAddress })
  }

  public async updateReferralCode(id: string, referralCode: string): Promise<void> {
    await this.http.put(`identities/${id}/referral`, { referralCode: referralCode })
  }

  public async updateEmail(id: string, email: string): Promise<void> {
    await this.http.put(`identities/${id}/email`, { email })
  }

  public authSetToken(token: string): void {
    this.http.setHeaders({
      Authorization: 'Bearer ' + token,
    })
  }

  public async authAuthenticate(request: AuthRequest, useToken = true): Promise<AuthResponse> {
    const response: AuthResponse = await this.http.post(`auth/authenticate`, request)
    if (useToken) {
      this.authSetToken(response.token)
    }
    return response
  }

  public async authLogin(request: AuthRequest): Promise<AuthResponse> {
    return this.http.post(`auth/login`, request)
  }

  public async authLogout(): Promise<void> {
    return this.http.delete(`auth/logout`)
  }

  public async authChangePassword(request: ChangePasswordRequest): Promise<void> {
    return this.http.put(`auth/password`, request)
  }

  public async findProposals(query?: ProposalQuery): Promise<Proposal[]> {
    const response = await this.http.get('proposals', query)
    if (!response) {
      throw new Error('Proposals response body is missing')
    }
    return parseProposalList(response).proposals || []
  }

  public async proposalsQuality(): Promise<ProposalMetrics[]> {
    const response = await this.http.get('proposals/quality')
    if (!response) {
      throw new Error('Proposals response body is missing')
    }
    return response.metrics || []
  }

  public async connectionCreate(
    request: ConnectionRequest,
    timeout: number | undefined = TIMEOUT_DISABLED
  ): Promise<ConnectionInfo> {
    const response = await this.http.put('connection', request, timeout)
    if (!response) {
      throw new Error('Connection creation response body is missing')
    }
    return parseConnectionInfo(response)
  }

  public async connectionStatus(): Promise<ConnectionInfo> {
    const response = await this.http.get('connection')
    if (!response) {
      throw new Error('Connection status response body is missing')
    }
    return parseConnectionInfo(response)
  }

  public async connectionCancel(): Promise<void> {
    await this.http.delete('connection')
  }

  public async connectionIp(timeout?: number): Promise<IP> {
    const response = await this.http.get('connection/ip', undefined, timeout)
    if (!response) {
      throw new Error('Connection IP response body is missing')
    }
    return parseIP(response)
  }

  public async connectionLocation(): Promise<Location> {
    return await this.http.get('connection/location')
  }

  public async connectionStatistics(): Promise<ConnectionStatistics> {
    const response = await this.http.get('connection/statistics')
    if (!response) {
      throw new Error('Connection statistics response body is missing')
    }
    return parseConnectionStatistics(response)
  }

  public async serviceList(): Promise<ServiceInfo[]> {
    const response = await this.http.get('services')
    if (!response) {
      throw new Error('Service list response body is missing')
    }

    return parseServiceListResponse(response)
  }

  public async serviceGet(id: string): Promise<ServiceInfo> {
    const response = await this.http.get('services/' + id)
    if (!response) {
      throw new Error('Service response body is missing')
    }

    return parseServiceInfo(response)
  }

  public async serviceStart(
    request: ServiceStartRequest,
    timeout: number | undefined = TIMEOUT_DISABLED
  ): Promise<ServiceInfo> {
    const response = await this.http.post('services', request, timeout)
    if (!response) {
      throw new Error('Service creation response body is missing')
    }
    return parseServiceInfo(response)
  }

  public async serviceStop(serviceId: string): Promise<void> {
    await this.http.delete('services/' + serviceId)
  }

  public async sessions(query?: SessionListQuery): Promise<SessionListResponse> {
    const response = await this.http.get('sessions', query)
    if (!response) {
      throw new Error('Sessions list response body is missing')
    }
    return parseSessionListResponse(response)
  }

  public async sessionStatsAggregated(
    query?: SessionQuery
  ): Promise<SessionStatsAggregatedResponse> {
    const response = await this.http.get('sessions/stats-aggregated', query)
    if (!response) {
      throw new Error('Session stats aggregated response body is missing')
    }
    return parseSessionStatsAggregatedResponse(response)
  }

  public async sessionStatsDaily(query?: SessionQuery): Promise<SessionStatsDailyResponse> {
    const response = await this.http.get('sessions/stats-daily', query)
    if (!response) {
      throw new Error('Session stats daily response body is missing')
    }
    return parseSessionStatsDailyResponse(response)
  }

  public async accessPolicies(): Promise<AccessPolicy[]> {
    const response = await this.http.get('access-policies')
    if (!response) {
      throw new Error('Access policies response body is missing')
    }

    return parseAccessPolicyList(response)
  }

  public async config(): Promise<Config> {
    const response = await this.http.get(pathConfig)
    if (!response) {
      throw new Error('Config body is missing')
    }

    return response
  }

  public async defaultConfig(): Promise<Config> {
    const response = await this.http.get(pathConfigDefault)
    if (!response) {
      throw new Error('Default config body is missing')
    }

    return response
  }

  public async userConfig(): Promise<Config> {
    const response = await this.http.get(pathConfigUser)
    if (!response) {
      throw new Error('User config body is missing')
    }

    return response
  }

  public async updateUserConfig(config: Config): Promise<Config> {
    return this.http.post(pathConfigUser, config)
  }

  public async reportIssue(issue: Issue, timeout?: number): Promise<IssueId> {
    return this.http.post(`feedback/issue`, issue, timeout)
  }

  public async transactorFees(): Promise<Fees> {
    return this.http.get(`transactor/fees`)
  }

  public async settleSync(request: SettleRequest): Promise<void> {
    return this.http.post(`transactor/settle/sync`, request)
  }

  public async settleAsync(request: SettleRequest): Promise<void> {
    return this.http.post(`transactor/settle/async`, request)
  }

  public async settleWithBeneficiary(request: SettleWithBeneficiaryRequest): Promise<void> {
    return this.http.post(`identities/${request.providerId}/beneficiary`, request)
  }

  public async settleIntoStakeSync(request: SettleRequest): Promise<void> {
    return this.http.post(`transactor/stake/increase/sync`, request)
  }

  public async settleIntoStakeAsync(request: SettleRequest): Promise<void> {
    return this.http.post(`transactor/stake/increase/async`, request)
  }

  public async decreaseStake(request: DecreaseStakeRequest): Promise<void> {
    return this.http.post(`transactor/stake/decrease`, request)
  }

  public async settlementHistory(query?: SettlementListQuery): Promise<SettlementListResponse> {
    const response = await this.http.get('transactor/settle/history', query)
    if (!response) {
      throw new Error('Settlement history response body is missing')
    }
    return parsePageable<Settlement>(response)
  }

  public async getMMNNodeReport(): Promise<MMNReportResponse> {
    return this.http.get(`mmn/report`)
  }

  public async setMMNApiKey(apiKey: string): Promise<void> {
    return this.http.post(`mmn/api-key`, { apiKey: apiKey })
  }

  public async getMMNApiKey(): Promise<MMNApiKeyResponse> {
    return this.http.get(`mmn/api-key`)
  }

  public async clearMMNApiKey(): Promise<void> {
    return this.http.delete(`mmn/api-key`)
  }

  public async createPaymentOrder(
    identity: string,
    request: PaymentOrderRequest
  ): Promise<PaymentOrderResponse> {
    return this.http.post(`/identities/${identity}/payment-order`, request)
  }

  public async getPaymentOrders(identity: string): Promise<PaymentOrderResponse[]> {
    return this.http.get(`/identities/${identity}/payment-order`)
  }

  public async getPaymentOrder(identity: string, orderId: number): Promise<PaymentOrderResponse> {
    return this.http.get(`/identities/${identity}/payment-order/${orderId}`)
  }

  public async getPaymentOrderOptions(): Promise<PaymentOrderOptionsResponse> {
    return this.http.get(`/payment-order-options`)
  }

  public async getPaymentOrderCurrencies(): Promise<string[]> {
    return this.http.get(`/payment-order-currencies`)
  }
}
