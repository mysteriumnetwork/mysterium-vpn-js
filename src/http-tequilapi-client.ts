/*
 * Copyright (C) 2017 The "mysteriumnetwork/mysterium-vpn-js" Authors.
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

import { HttpInterface, TIMEOUT_DISABLED } from './http'
import ProposalsQuery from './proposal/proposals-query'
import { AccessPolicyDTO, parseAccessPoliciesDTO } from './access-policy'
import {
  ConnectionRequest,
  ConnectionIPDTO,
  parseConnectionIPDTO,
  ConnectionSessionDTO,
  validateSession,
  ConnectionStatisticsDTO,
  parseConnectionStatisticsDTO,
  ConnectionStatusDTO,
  parseConnectionStatusDTO,
} from './connection'
import { ConsumerLocationDTO, parseConsumerLocationDTO } from './consumer'
import {
  IdentityDTO,
  parseIdentityDTO,
  parseIdentitiesResponseDTO,
  IdentityPayoutDTO,
  parseIdentityPayoutDTO,
  IdentityRegistrationDTO,
  parseIdentityRegistrationDTO,
} from './identity'
import { NatStatusDTO, parseNatStatusResponse } from './nat'
import { NodeHealthcheckDTO, parseHealthcheckResponse } from './daemon'
import { ProposalDTO, parseProposalsResponseDTO, ProposalQueryOptions } from './proposal'
import {
  parseServiceInfoDTO,
  ServiceInfoDTO,
  parseServiceListDTO,
  ServiceRequest,
  parseServiceSessionListDTO,
  ServiceSessionDTO,
} from './provider'

export interface TequilapiClient {
  healthCheck(timeout?: number): Promise<NodeHealthcheckDTO>
  natStatus(): Promise<NatStatusDTO>
  stop(): Promise<void>
  location(timeout?: number): Promise<ConsumerLocationDTO>

  identitiesList(): Promise<IdentityDTO[]>
  identityCreate(passphrase: string): Promise<IdentityDTO>
  identityUnlock(id: string, passphrase: string, timeout?: number): Promise<void>
  identityRegistration(id: string): Promise<IdentityRegistrationDTO>
  identityPayout(id: string): Promise<IdentityPayoutDTO>
  updateIdentityPayout(id: string, ethAddress: string): Promise<void>

  findProposals(options?: ProposalQueryOptions): Promise<ProposalDTO[]>

  connectionCreate(request: ConnectionRequest, timeout?: number): Promise<ConnectionStatusDTO>
  connectionStatus(): Promise<ConnectionStatusDTO>
  connectionCancel(): Promise<void>
  connectionIP(timeout?: number): Promise<ConnectionIPDTO>
  connectionStatistics(): Promise<ConnectionStatisticsDTO>
  connectionSessions(): Promise<ConnectionSessionDTO[]>

  serviceList(): Promise<ServiceInfoDTO[]>
  serviceGet(serviceId: string): Promise<ServiceInfoDTO>
  serviceStart(request: ServiceRequest, timeout?: number): Promise<ServiceInfoDTO>
  serviceStop(serviceId: string): Promise<void>
  serviceSessions(): Promise<ServiceSessionDTO[]>

  accessPolicies(): Promise<AccessPolicyDTO[]>
}

export class HttpTequilapiClient implements TequilapiClient {
  public http: HttpInterface

  public constructor(http: HttpInterface) {
    this.http = http
  }

  public async healthCheck(timeout?: number): Promise<NodeHealthcheckDTO> {
    const response = await this.http.get('healthcheck', undefined, timeout)
    if (!response) {
      throw new Error('Healthcheck response body is missing')
    }
    return parseHealthcheckResponse(response)
  }

  public async natStatus(): Promise<NatStatusDTO> {
    const response = await this.http.get('nat/status')
    return parseNatStatusResponse(response)
  }

  public async stop(): Promise<void> {
    await this.http.post('stop')
  }

  public async location(timeout?: number): Promise<ConsumerLocationDTO> {
    const response = await this.http.get('location', undefined, timeout)
    if (!response) {
      throw new Error('Location response body is missing')
    }
    return parseConsumerLocationDTO(response)
  }

  public async identitiesList(): Promise<IdentityDTO[]> {
    const response = await this.http.get('identities')
    if (!response) {
      throw new Error('Identities response body is missing')
    }
    const responseDto = parseIdentitiesResponseDTO(response)

    return responseDto.identities
  }

  public async identityCreate(passphrase: string): Promise<IdentityDTO> {
    const response = await this.http.post('identities', { passphrase })
    if (!response) {
      throw new Error('Identities creation response body is missing')
    }
    return parseIdentityDTO(response)
  }

  public async identityUnlock(id: string, passphrase: string, timeout?: number): Promise<void> {
    await this.http.put('identities/' + id + '/unlock', { passphrase }, timeout)
  }

  public async identityRegistration(id: string): Promise<IdentityRegistrationDTO> {
    const response = await this.http.get(`identities/${id}/registration`)
    if (!response) {
      throw new Error('Identities registration response body is missing')
    }
    return parseIdentityRegistrationDTO(response)
  }

  public async identityPayout(id: string): Promise<IdentityPayoutDTO> {
    const response = await this.http.get(`identities/${id}/payout`)
    if (!response) {
      throw new Error('Identity payout response body is missing')
    }
    return parseIdentityPayoutDTO(response)
  }

  public async updateIdentityPayout(id: string, ethAddress: string): Promise<void> {
    await this.http.put(`identities/${id}/payout`, { ethAddress })
  }

  public async findProposals(options?: ProposalQueryOptions): Promise<ProposalDTO[]> {
    const params = options ? new ProposalsQuery(options).toQueryParams() : undefined
    const response = await this.http.get('proposals', params)
    if (!response) {
      throw new Error('Proposals response body is missing')
    }
    const responseDto = parseProposalsResponseDTO(response)
    const proposals = responseDto.proposals

    return proposals || []
  }

  public async connectionCreate(
    request: ConnectionRequest,
    timeout: number | undefined = TIMEOUT_DISABLED
  ): Promise<ConnectionStatusDTO> {
    const response = await this.http.put(
      'connection',
      {
        consumerId: request.consumerId,
        providerId: request.providerId,
        serviceType: request.serviceType,
      },
      timeout
    )
    if (!response) {
      throw new Error('Connection creation response body is missing')
    }
    return parseConnectionStatusDTO(response)
  }

  public async connectionStatus(): Promise<ConnectionStatusDTO> {
    const response = await this.http.get('connection')
    if (!response) {
      throw new Error('Connection status response body is missing')
    }
    return parseConnectionStatusDTO(response)
  }

  public async connectionCancel(): Promise<void> {
    await this.http.delete('connection')
  }

  public async connectionIP(timeout?: number): Promise<ConnectionIPDTO> {
    const response = await this.http.get('connection/ip', undefined, timeout)
    if (!response) {
      throw new Error('Connection IP response body is missing')
    }
    return parseConnectionIPDTO(response)
  }

  public async connectionStatistics(): Promise<ConnectionStatisticsDTO> {
    const response = await this.http.get('connection/statistics')
    if (!response) {
      throw new Error('Connection statistics response body is missing')
    }
    return parseConnectionStatisticsDTO(response)
  }

  public async connectionSessions(): Promise<ConnectionSessionDTO[]> {
    const response = await this.http.get('connection-sessions')
    if (!response) {
      throw new Error('Connection sessions response body is missing')
    }
    return response.sessions.map(validateSession)
  }

  public async serviceList(): Promise<ServiceInfoDTO[]> {
    const response = await this.http.get('services')
    if (!response) {
      throw new Error('Service list response body is missing')
    }

    return parseServiceListDTO(response)
  }

  public async serviceGet(id: string): Promise<ServiceInfoDTO> {
    const response = await this.http.get('services/' + id)
    if (!response) {
      throw new Error('Service response body is missing')
    }

    return parseServiceInfoDTO(response)
  }

  public async serviceStart(
    request: ServiceRequest,
    timeout: number | undefined = TIMEOUT_DISABLED
  ): Promise<ServiceInfoDTO> {
    const response = await this.http.post(
      'services',
      {
        providerId: request.providerId,
        type: request.type,
        accessPolicies: request.accessPolicies,
        options: request.options,
      },
      timeout
    )
    if (!response) {
      throw new Error('Service creation response body is missing')
    }
    return parseServiceInfoDTO(response)
  }

  public async serviceStop(serviceId: string): Promise<void> {
    await this.http.delete('services/' + serviceId)
  }

  public async serviceSessions(): Promise<ServiceSessionDTO[]> {
    const response = await this.http.get('service-sessions')
    if (!response) {
      throw new Error('Service sessions response body is missing')
    }
    return parseServiceSessionListDTO(response)
  }

  public async accessPolicies(): Promise<AccessPolicyDTO[]> {
    const response = await this.http.get('access-policies')
    if (!response) {
      throw new Error('Access policies response body is missing')
    }

    return parseAccessPoliciesDTO(response)
  }
}
