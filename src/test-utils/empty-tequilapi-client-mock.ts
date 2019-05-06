/*
 * Copyright (C) 2019 The "mysteriumnetwork/mysterium-vpn-js" Authors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

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
import { IdentityRegistration } from '../identity/registration'
import { NatStatusResponse } from '../nat/status'
import { Proposal, ProposalQuery } from '../proposal/proposal'
import { ServiceInfoDTO, ServiceRequest, ServiceSessionDTO } from '../provider'
import { TequilapiClient } from '../tequilapi-client'

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

  public serviceGet(serviceId: string): Promise<ServiceInfoDTO> {
    throw Error('Not implemented')
  }

  public serviceList(): Promise<ServiceInfoDTO[]> {
    throw Error('Not implemented')
  }

  public serviceStart(request: ServiceRequest, timeout?: number): Promise<ServiceInfoDTO> {
    throw Error('Not implemented')
  }

  public serviceStop(serviceId: string): Promise<void> {
    throw Error('Not implemented')
  }

  public connectionSessions(): Promise<ConnectionSession[]> {
    throw Error('Not implemented')
  }

  public serviceSessions(): Promise<ServiceSessionDTO[]> {
    throw Error('Not implemented')
  }

  public stop(): Promise<void> {
    throw Error('Not implemented')
  }

  public accessPolicies(): Promise<AccessPolicy[]> {
    throw Error('Not implemented')
  }
}
