/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MMNApiKeyResponse, MMNReportResponse } from './mmn/mmn'
import { IntercomIssue, Issue, IssueId } from './feedback/issue'
import { Config } from './config/config'
import { AccessPolicy, parseAccessPolicyList } from './access-policy/access-policy'
import { ConnectionCancelRequest, ConnectionRequest } from './connection/request'
import { ConnectionInfo, parseConnectionInfo } from './connection/status'
import { IP, parseIP } from './location/ip'
import { ConnectionStatistics, parseConnectionStatistics } from './connection/statistics'
import { Location, parseLocation } from './location/location'
import { NodeHealthcheck, parseHealthcheckResponse } from './daemon/healthcheck'
import { Terms, TermsRequest } from './daemon/terms'
import { HttpInterface } from './http/interface'
import { TIMEOUT_DISABLED } from './http/timeouts'
import {
  IdentityBalanceResponse,
  Identity,
  IdentityRef,
  parseIdentity,
  parseIdentityList,
  parseIdentityRef,
} from './identity/identity'
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
import { NodeMonitoringStatusResponse, parseNodeMonitoringStatus } from './node/status'
import { parseProposalList, Proposal, ProposalQuery } from './proposal/proposal'
import { parseServiceInfo, parseServiceListResponse, ServiceInfo } from './provider/service-info'
import { ServiceListRequest, ServiceStartRequest } from './provider/service-request'
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
import { ChainSummary } from './transactor/chains'
import { Fees, FeesResponse } from './transactor/fees'
import { EligibilityResponse } from './transactor/registration'
import {
  SettleRequest,
  SettleWithBeneficiaryRequest,
  DecreaseStakeRequest,
  SettlementListQuery,
  SettlementListResponse,
  BeneficiaryTxStatus,
  validateSettlementResponse,
} from './transactor/settlement'
import { IdentityCurrentRequest } from './identity/selection'
import { AuthRequest, AuthResponse, ChangePasswordRequest } from './auth/auth'
import { Money, PaymentAPI } from './payment'
import { ReferralTokenResponse, ReferralTokenRewardsResponse } from './referral'
import { CurrentPricesResponse, CurrentPricesV2Response } from './prices'
import { parsePayoutAddressResponse, Payout } from './identity/payout'
import { FilterPresetsResponse } from './proposal/filter-preset'
import { EntertainmentEstimateQuery, EntertainmentEstimateResponse } from './payment/entertainment'
import { NatTypeResponse, parseNatTypeResponse } from './nat/type'
import { WithdrawRequest } from './transactor/withdraw'
import { ProviderAPI } from './provider'
import { IdentityExportRequest } from './identity/export'

export const TEQUILAPI_URL = 'http://127.0.0.1:4050'
export const pathConfig = 'config'
export const pathConfigUser = 'config/user'
export const pathConfigDefault = 'config/default'
export const pathInvoice = '/invoice'

export interface BaseTequilapiClient {
  healthCheck(timeout?: number): Promise<NodeHealthcheck>
  natStatus(): Promise<NatStatusResponse>
  nodeMonitoringStatus(): Promise<NodeMonitoringStatusResponse>
  natType(): Promise<NatTypeResponse>
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
  identityBalanceRefresh(id: string): Promise<IdentityBalanceResponse>

  payoutAddressSave(id: string, address: string): Promise<Payout>
  payoutAddressGet(id: string): Promise<Payout>

  authSetToken(token: string): void
  authAuthenticate(request: AuthRequest, useToken: true): Promise<AuthResponse>
  authLogin(request: AuthRequest): Promise<AuthResponse>
  authLogout(): Promise<void>
  authChangePassword(request: ChangePasswordRequest): Promise<void>

  findProposals(options?: ProposalQuery): Promise<Proposal[]>
  proposalFilterPresets(): Promise<FilterPresetsResponse>
  pricesCurrent(): Promise<CurrentPricesResponse>
  pricesCurrentV2(): Promise<CurrentPricesV2Response[]>

  reportIssueGithub(issue: Issue, timeout?: number): Promise<IssueId>
  reportIssueIntercom(issue: IntercomIssue, timeout?: number): Promise<void>

  connectionCreate(request: ConnectionRequest, timeout?: number): Promise<ConnectionInfo>
  connectionStatus(): Promise<ConnectionInfo>
  connectionCancel(request?: ConnectionCancelRequest): Promise<void>
  connectionIp(timeout?: number): Promise<IP>
  connectionStatistics(): Promise<ConnectionStatistics>
  connectionLocation(): Promise<Location>

  serviceList(request?: ServiceListRequest): Promise<ServiceInfo[]>
  serviceGet(serviceId: string): Promise<ServiceInfo>
  serviceStart(request: ServiceStartRequest, timeout?: number): Promise<ServiceInfo>
  serviceStop(serviceId: string): Promise<void>

  /**
   * @deprecated use ProviderAPI
   */
  sessions(query?: SessionListQuery): Promise<SessionListResponse>
  /**
   * @deprecated use ProviderAPI
   */
  sessionStatsAggregated(query?: SessionQuery): Promise<SessionStatsAggregatedResponse>
  /**
   * @deprecated use ProviderAPI
   */
  sessionStatsDaily(query?: SessionQuery): Promise<SessionStatsDailyResponse>
  accessPolicies(): Promise<AccessPolicy[]>

  transactorFees(chainId?: number): Promise<Fees>
  settleSync(request: SettleRequest): Promise<void>
  settleAsync(request: SettleRequest): Promise<void>
  exportIdentity(request: IdentityExportRequest): Promise<any>
  settleWithBeneficiary(request: SettleWithBeneficiaryRequest): Promise<void>
  settleIntoStakeSync(request: SettleRequest): Promise<void>
  settleIntoStakeAsync(request: SettleRequest): Promise<void>
  decreaseStake(request: DecreaseStakeRequest): Promise<void>
  settlementHistory(query?: SettlementListQuery): Promise<SettlementListResponse>
  beneficiaryTxStatus(id: string): Promise<BeneficiaryTxStatus>
  withdraw(request: WithdrawRequest): Promise<void>
  chainSummary(): Promise<ChainSummary>
  freeRegistrationEligibility(id: string): Promise<EligibilityResponse>
  freeProviderRegistrationEligibility(): Promise<EligibilityResponse>

  getMMNNodeReport(): Promise<MMNReportResponse>
  setMMNApiKey(apiKey: string): Promise<void>
  getMMNApiKey(): Promise<MMNApiKeyResponse>
  clearMMNApiKey(): Promise<void>

  exchangeRate(quoteCurrency?: string): Promise<Money>
  estimateEntertainment(query: EntertainmentEstimateQuery): Promise<EntertainmentEstimateResponse>

  getReferralToken(identity: string): Promise<ReferralTokenResponse>
  referralTokenRewards(token: string): Promise<ReferralTokenRewardsResponse>
  validateEthRPCL2(rpcUrls: string[], timeout?: number): Promise<void>
}

class BaseHttpTequilapiClient implements BaseTequilapiClient {
  public http: HttpInterface
  public readonly payment: PaymentAPI
  public readonly provider: ProviderAPI

  public constructor(http: HttpInterface) {
    this.http = http
    this.payment = new PaymentAPI(http)
    this.provider = new ProviderAPI(http)
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

  public async nodeMonitoringStatus(): Promise<NodeMonitoringStatusResponse> {
    const response = await this.http.get('node/monitoring-status')
    return parseNodeMonitoringStatus(response)
  }

  public async natType(): Promise<NatTypeResponse> {
    const response = await this.http.get('nat/type')
    return parseNatTypeResponse(response)
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

  public async identityBalanceRefresh(id: string): Promise<IdentityBalanceResponse> {
    const response = await this.http.put(`identities/${id}/balance/refresh`, {})
    if (!response) {
      throw new Error('Identity balance refresh response body is missing')
    }
    return response
  }

  public async payoutAddressSave(id: string, address: string): Promise<Payout> {
    const response = await this.http.put(`identities/${id}/payout-address`, { address })
    if (!response) {
      throw new Error('Payout address response body is missing')
    }

    return parsePayoutAddressResponse(response)
  }

  public async payoutAddressGet(id: string): Promise<Payout> {
    const response = await this.http.get(`identities/${id}/payout-address`)
    if (!response) {
      throw new Error('Payout address response body is missing')
    }

    return parsePayoutAddressResponse(response)
  }

  public authSetToken(token: string): void {
    this.http.setAuthHeader(token)
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

  public async proposalFilterPresets(): Promise<FilterPresetsResponse> {
    return this.http.get('proposals/filter-presets')
  }

  public async pricesCurrent(): Promise<CurrentPricesResponse> {
    return this.http.get('prices/current')
  }

  public async pricesCurrentV2(): Promise<CurrentPricesV2Response[]> {
    return this.http.get('v2/prices/current')
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

  public async connectionCancel(request?: ConnectionCancelRequest): Promise<void> {
    await this.http.delete(
      `connection${request?.proxyPort !== undefined ? `?id=${request.proxyPort}` : ''}`
    )
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

  public async serviceList(request?: ServiceListRequest): Promise<ServiceInfo[]> {
    const response = await this.http.get('services', { includeAll: request?.includeAll })
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

  /**
   * @deprecated use ProviderAPI
   */
  public async sessionStatsAggregated(
    query?: SessionQuery
  ): Promise<SessionStatsAggregatedResponse> {
    const response = await this.http.get('sessions/stats-aggregated', query)
    if (!response) {
      throw new Error('Session stats aggregated response body is missing')
    }
    return parseSessionStatsAggregatedResponse(response)
  }

  /**
   * @deprecated use ProviderAPI
   */
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

  public async reportIssueGithub(issue: Issue, timeout?: number): Promise<IssueId> {
    return this.http.post(`feedback/issue`, issue, timeout)
  }

  public async reportIssueIntercom(issue: IntercomIssue, timeout?: number): Promise<void> {
    return this.http.post(`feedback/issue/intercom`, issue, timeout)
  }

  public async transactorFees(chainId?: number): Promise<Fees> {
    return this.http.get(`transactor/fees`, { chainId })
  }

  public async transactorFeesV2(chainId?: number): Promise<FeesResponse> {
    return this.http.get(`v2/transactor/fees`, { chainId })
  }

  public async settleSync(request: SettleRequest): Promise<void> {
    return this.http.post(`transactor/settle/sync`, request)
  }

  public async settleAsync(request: SettleRequest): Promise<void> {
    return this.http.post(`transactor/settle/async`, request)
  }

  public async exportIdentity(request: any): Promise<any> {
    return this.http.post(`identities/export`, request)
  }

  public async settleWithBeneficiary(request: SettleWithBeneficiaryRequest): Promise<void> {
    return this.http.post(`identities/${request.providerId}/beneficiary`, request)
  }

  public async beneficiaryTxStatus(id: string): Promise<BeneficiaryTxStatus> {
    return this.http.get(`/identities/${id}/beneficiary-status`)
  }

  public async chainSummary(): Promise<ChainSummary> {
    return this.http.get(`/transactor/chain-summary`)
  }

  public async freeRegistrationEligibility(id: string): Promise<EligibilityResponse> {
    return this.http.get(`/identities/${id}/eligibility`)
  }

  public async freeProviderRegistrationEligibility(): Promise<EligibilityResponse> {
    return this.http.get(`/identities/provider/eligibility`)
  }

  public async withdraw(request: WithdrawRequest): Promise<void> {
    return this.http.post('/transactor/settle/withdraw', request)
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
    return validateSettlementResponse<SettlementListResponse>(response)
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

  public async getReferralToken(identity: string): Promise<ReferralTokenResponse> {
    return this.http.get(`/identities/${identity}/referral`)
  }

  public async exchangeRate(quoteCurrency = 'usd'): Promise<Money> {
    const baseCurrency = 'myst'
    return this.http.get(`/exchange/${baseCurrency}/${quoteCurrency}`)
  }

  public async validateEthRPCL2(rpcUrls: string[], timeout = 10_000): Promise<void> {
    if (rpcUrls.length == 0) {
      return Promise.resolve()
    }
    return this.http.post('/validation/validate-rpc-chain2-urls', rpcUrls, timeout * rpcUrls.length)
  }

  public async estimateEntertainment(
    query: EntertainmentEstimateQuery
  ): Promise<EntertainmentEstimateResponse> {
    return this.http.get(`/entertainment`, { ...query })
  }

  public async referralTokenRewards(token: string): Promise<ReferralTokenRewardsResponse> {
    return this.http.get(`/transactor/token/${token}/reward`)
  }
}

export class TequilapiClient extends BaseHttpTequilapiClient { }
