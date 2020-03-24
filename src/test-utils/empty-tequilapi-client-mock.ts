/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

import { Issue, IssueId } from '../feedback/issue'
import { Config } from '../config/config'
import { AccessPolicy } from '../access-policy/access-policy'
import { ConnectionIp } from '../connection/ip'
import { ConnectionRequest } from '../connection/request'
import { ConnectionSession } from '../connection/session'
import { ConnectionStatistics } from '../connection/statistics'
import { ConnectionStatusResponse } from '../connection/status'
import { ConsumerLocation } from '../consumer/location'
import { NodeHealthcheck } from '../daemon/healthcheck'
import { Identity } from '../identity/identity'
import { IdentityPayout } from '../identity/payout'
import { IdentityStatus } from '../identity/status'
import { IdentityRegistration } from '../identity/registration'
import { NatStatusResponse } from '../nat/status'
import { Proposal, ProposalQuery } from '../proposal/proposal'
import { ServiceInfo } from '../provider/service-info'
import { ServiceRequest } from '../provider/service-request'
import { ServiceSession } from '../provider/service-session'
import { TequilapiClient } from '../tequilapi-client'
import { TopUpRequest } from '../payment/topup'

export class EmptyTequilapiClientMock implements TequilapiClient {
  public connectionCancel(): Promise<void> {
    throw Error('Not implemented')
  }

  public connectionCreate(
    request: ConnectionRequest,
    timeout?: number
  ): Promise<ConnectionStatusResponse> {
    throw Error('Not implemented')
  }

  public connectionIp(timeout?: number): Promise<ConnectionIp> {
    throw Error('Not implemented')
  }

  public connectionLocation(): Promise<ConsumerLocation> {
    throw Error('Not implemented')
  }

  public connectionStatistics(): Promise<ConnectionStatistics> {
    throw Error('Not implemented')
  }

  public connectionStatus(): Promise<ConnectionStatusResponse> {
    throw Error('Not implemented')
  }

  public findProposals(options?: ProposalQuery): Promise<Proposal[]> {
    throw Error('Not implemented')
  }

  public healthCheck(timeout?: number): Promise<NodeHealthcheck> {
    throw Error('Not implemented')
  }

  public identityList(): Promise<Identity[]> {
    throw Error('Not implemented')
  }

  public identityCreate(passphrase: string): Promise<Identity> {
    throw Error('Not implemented')
  }

  public identityStatus(id: string): Promise<IdentityStatus> {
    throw Error('Not implemented')
  }

  public identityRegistration(id: string): Promise<IdentityRegistration> {
    throw Error('Not implemented')
  }

  public updateIdentityPayout(id: string, ethAddress: string): Promise<void> {
    throw Error('Not implemented')
  }

  public identityUnlock(id: string, passphrase: string, timeout?: number): Promise<void> {
    throw Error('Not implemented')
  }

  public identityPayout(id: string): Promise<IdentityPayout> {
    throw Error('Not implemented')
  }

  public location(timeout?: number): Promise<ConsumerLocation> {
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

  public serviceStart(request: ServiceRequest, timeout?: number): Promise<ServiceInfo> {
    throw Error('Not implemented')
  }

  public serviceStop(serviceId: string): Promise<void> {
    throw Error('Not implemented')
  }

  public connectionSessions(): Promise<ConnectionSession[]> {
    throw Error('Not implemented')
  }

  public serviceSessions(): Promise<ServiceSession[]> {
    throw Error('Not implemented')
  }

  public stop(): Promise<void> {
    throw Error('Not implemented')
  }

  public accessPolicies(): Promise<AccessPolicy[]> {
    throw Error('Not implemented')
  }

  public identityCurrent(passphrase: string): Promise<Identity> {
    throw Error('Not implemented')
  }

  public updateReferralCode(id: string, referralCode: string): Promise<void> {
    throw Error('Not implemented')
  }

  public updateEmail(id: string, email: string): Promise<void> {
    throw Error('Not implemented')
  }

  public authChangePassword(
    username: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    throw Error('Not implemented')
  }

  public authLogin(username: string, password: string): Promise<void> {
    throw Error('Not implemented')
  }

  public updateUserConfig(config: Config): Promise<void> {
    throw Error('Not implemented')
  }

  public userConfig(): Promise<Config> {
    throw Error('Not implemented')
  }

  public reportIssue(issue: Issue): Promise<IssueId> {
    throw Error('Not implemented')
  }

  public topUp(request: TopUpRequest): Promise<void> {
    throw Error('Not implemented')
  }
}
