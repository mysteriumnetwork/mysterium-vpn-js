/*
 * Copyright (C) 2019 The "mysteriumnetwork/js-tequilapi" Authors.
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

import { TequilapiClient } from './client'
import { HttpInterface } from './adapters/interface'
import { NodeHealthcheckDTO, parseHealthcheckResponse } from './dto/node-healthcheck'
import { IdentityDTO, parseIdentityDTO } from './dto/identity'
import { parseIdentitiesResponseDTO } from './dto/identities-response'
import { ConsumerLocationDTO, parseConsumerLocationDTO } from './dto/consumer-location'
import { ConnectionStatisticsDTO, parseConnectionStatisticsDTO } from './dto/connection-statistics'
import { ConnectionIPDTO, parseConnectionIPDTO } from './dto/connection-ip'
import { ConnectionStatusDTO, parseConnectionStatusDTO } from './dto/connection-status-dto'
import { parseProposalsResponseDTO } from './dto/proposals-response'
import { ConnectionRequest } from './dto/query/connection-request'
import { TIMEOUT_DISABLED } from './timeouts'
import {
  IdentityRegistrationDTO,
  parseIdentityRegistrationDTO
} from './dto/identity-registration/identity-registration'
import { ProposalQueryOptions } from './dto/query/proposals-query-options'
import ProposalsQuery from './adapters/proposals-query'
import { ProposalDTO } from './dto/proposal'

export class HttpTequilapiClient implements TequilapiClient {
  http: HttpInterface

  constructor (http: HttpInterface) {
    this.http = http
  }

  async healthCheck (timeout?: number): Promise<NodeHealthcheckDTO> {
    const response = await this.http.get('healthcheck', undefined, timeout)
    if (!response) {
      throw new Error('Healthcheck response body is missing')
    }
    return parseHealthcheckResponse(response)
  }

  async stop (): Promise<void> {
    await this.http.post('stop')
  }

  async identitiesList (): Promise<Array<IdentityDTO>> {
    const response = await this.http.get('identities')
    if (!response) {
      throw new Error('Identities response body is missing')
    }
    const responseDto = parseIdentitiesResponseDTO(response)

    return responseDto.identities
  }

  async identityCreate (passphrase: string): Promise<IdentityDTO> {
    const response = await this.http.post('identities', { passphrase })
    if (!response) {
      throw new Error('Identities creation response body is missing')
    }
    return parseIdentityDTO(response)
  }

  async identityUnlock (id: string, passphrase: string, timeout?: number): Promise<void> {
    await this.http.put('identities/' + id + '/unlock', { passphrase }, timeout)
  }

  async identityRegistration (id: string): Promise<IdentityRegistrationDTO> {
    const response = await this.http.get(`identities/${id}/registration`)
    if (!response) {
      throw new Error('Identities registration response body is missing')
    }
    return parseIdentityRegistrationDTO(response)
  }

  async findProposals (options?: ProposalQueryOptions): Promise<Array<ProposalDTO>> {
    const params = options ? new ProposalsQuery(options).toQueryParams() : undefined
    const response = await this.http.get('proposals', params)
    if (!response) {
      throw new Error('Proposals response body is missing')
    }
    const responseDto = parseProposalsResponseDTO(response)
    const proposals = responseDto.proposals

    if (!proposals) {
      return []
    }
    return proposals
  }

  async connectionCreate (
    request: ConnectionRequest,
    timeout: number | undefined = TIMEOUT_DISABLED): Promise<ConnectionStatusDTO> {
    const response = await this.http.put(
      'connection',
      {
        consumerId: request.consumerId,
        providerId: request.providerId,
        serviceType: request.serviceType
      },
      timeout
    )
    if (!response) {
      throw new Error('Connection creation response body is missing')
    }
    return parseConnectionStatusDTO(response)
  }

  async connectionStatus (): Promise<ConnectionStatusDTO> {
    const response = await this.http.get('connection')
    if (!response) {
      throw new Error('Connection status response body is missing')
    }
    return parseConnectionStatusDTO(response)
  }

  async connectionCancel (): Promise<void> {
    await this.http.delete('connection')
  }

  async connectionIP (timeout?: number): Promise<ConnectionIPDTO> {
    const response = await this.http.get('connection/ip', undefined, timeout)
    if (!response) {
      throw new Error('Connection IP response body is missing')
    }
    return parseConnectionIPDTO(response)
  }

  async connectionStatistics (): Promise<ConnectionStatisticsDTO> {
    const response = await this.http.get('connection/statistics')
    if (!response) {
      throw new Error('Connection statistics response body is missing')
    }
    return parseConnectionStatisticsDTO(response)
  }

  async location (timeout?: number): Promise<ConsumerLocationDTO> {
    const response = await this.http.get('location', undefined, timeout)
    if (!response) {
      throw new Error('Location response body is missing')
    }
    return parseConsumerLocationDTO(response)
  }
}
