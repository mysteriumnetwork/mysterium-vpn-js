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

import { TequilapiClient } from '../tequilapi-client'
import { AccessPolicyDTO } from '../access-policy'
import {
  ConnectionIPDTO,
  ConnectionSessionDTO,
  ConnectionStatisticsDTO,
  ConnectionStatusDTO,
  ConnectionRequest,
} from '../connection'
import { ConsumerLocationDTO } from '../consumer'
import { IdentityDTO, IdentityPayoutDTO, IdentityRegistrationDTO } from '../identity'
import { NodeHealthcheckDTO } from '../daemon'
import { Proposal, ProposalQuery } from '../proposal/proposal'
import { ServiceInfoDTO, ServiceRequest, ServiceSessionDTO } from '../provider'
import { NatStatusDTO } from '../nat'

export class EmptyTequilapiClientMock implements TequilapiClient {
  public connectionCancel(): Promise<void> {
    throw Error('Not implemented')
  }

  public connectionCreate(
    request: ConnectionRequest,
    timeout?: number
  ): Promise<ConnectionStatusDTO> {
    throw Error('Not implemented')
  }

  public connectionIP(timeout?: number): Promise<ConnectionIPDTO> {
    throw Error('Not implemented')
  }

  public connectionStatistics(): Promise<ConnectionStatisticsDTO> {
    throw Error('Not implemented')
  }

  public connectionStatus(): Promise<ConnectionStatusDTO> {
    throw Error('Not implemented')
  }

  public findProposals(options?: ProposalQuery): Promise<Proposal[]> {
    throw Error('Not implemented')
  }

  public healthCheck(timeout?: number): Promise<NodeHealthcheckDTO> {
    throw Error('Not implemented')
  }

  public identitiesList(): Promise<IdentityDTO[]> {
    throw Error('Not implemented')
  }

  public identityCreate(passphrase: string): Promise<IdentityDTO> {
    throw Error('Not implemented')
  }

  public identityRegistration(id: string): Promise<IdentityRegistrationDTO> {
    throw Error('Not implemented')
  }

  public updateIdentityPayout(id: string, ethAddress: string): Promise<void> {
    throw Error('Not implemented')
  }

  public identityUnlock(id: string, passphrase: string, timeout?: number): Promise<void> {
    throw Error('Not implemented')
  }

  public identityPayout(id: string): Promise<IdentityPayoutDTO> {
    throw Error('Not implemented')
  }

  public location(timeout?: number): Promise<ConsumerLocationDTO> {
    throw Error('Not implemented')
  }

  public natStatus(): Promise<NatStatusDTO> {
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

  public connectionSessions(): Promise<ConnectionSessionDTO[]> {
    throw Error('Not implemented')
  }

  public serviceSessions(): Promise<ServiceSessionDTO[]> {
    throw Error('Not implemented')
  }

  public stop(): Promise<void> {
    throw Error('Not implemented')
  }

  public accessPolicies(): Promise<AccessPolicyDTO[]> {
    throw Error('Not implemented')
  }
}
