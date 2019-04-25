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

import { TequilapiClient } from 'mysterium-tequilapi/lib/client'
import { AccessPolicyDTO } from 'mysterium-tequilapi/lib/dto/access-policies'
import { ConnectionIPDTO } from 'mysterium-tequilapi/lib/dto/connection-ip'
import { ConnectionSessionDTO } from 'mysterium-tequilapi/lib/dto/connection-session'
import { ConnectionStatisticsDTO } from 'mysterium-tequilapi/lib/dto/connection-statistics'
import { ConnectionStatusDTO } from 'mysterium-tequilapi/lib/dto/connection-status-dto'
import { ConsumerLocationDTO } from 'mysterium-tequilapi/lib/dto/consumer-location'
import { IdentityDTO } from 'mysterium-tequilapi/lib/dto/identity'
import { IdentityPayoutDTO } from 'mysterium-tequilapi/lib/dto/identity-payout'
import { IdentityRegistrationDTO } from 'mysterium-tequilapi/lib/dto/identity-registration/identity-registration'
import { NodeHealthcheckDTO } from 'mysterium-tequilapi/lib/dto/node-healthcheck'
import { ProposalDTO } from 'mysterium-tequilapi/lib/dto/proposal'
import { ConnectionRequest } from 'mysterium-tequilapi/lib/dto/query/connection-request'
import { ProposalQueryOptions } from 'mysterium-tequilapi/lib/dto/query/proposals-query-options'
import { ServiceInfoDTO } from 'mysterium-tequilapi/lib/dto/service-info'
import { ServiceRequest } from 'mysterium-tequilapi/lib/dto/service-request'
import { ServiceSessionDTO } from 'mysterium-tequilapi/lib/dto/service-session'

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

  public findProposals(options?: ProposalQueryOptions): Promise<ProposalDTO[]> {
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
