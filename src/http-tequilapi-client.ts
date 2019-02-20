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

import { HttpInterface } from './adapters/interface'
import ProposalsQuery from './adapters/proposals-query'
import { TequilapiClient } from './client'
import { ConnectionIPDTO, parseConnectionIPDTO } from './dto/connection-ip'
import { ConnectionStatisticsDTO, parseConnectionStatisticsDTO } from './dto/connection-statistics'
import { ConnectionStatusDTO, parseConnectionStatusDTO } from './dto/connection-status-dto'
import { ConsumerLocationDTO, parseConsumerLocationDTO } from './dto/consumer-location'
import { parseIdentitiesResponseDTO } from './dto/identities-response'
import { IdentityDTO, parseIdentityDTO } from './dto/identity'
import {
  IdentityRegistrationDTO,
  parseIdentityRegistrationDTO
} from './dto/identity-registration/identity-registration'
import { NodeHealthcheckDTO, parseHealthcheckResponse } from './dto/node-healthcheck'
import { ProposalDTO } from './dto/proposal'
import { parseProposalsResponseDTO } from './dto/proposals-response'
import { ConnectionRequest } from './dto/query/connection-request'
import { ProposalQueryOptions } from './dto/query/proposals-query-options'
import { TIMEOUT_DISABLED } from './timeouts'

export class HttpTequilapiClient implements TequilapiClient {
  public http: HttpInterface

  constructor (http: HttpInterface) {
    this.http = http
  }

  public async healthCheck (timeout?: number): Promise<NodeHealthcheckDTO> {
    const response = await this.http.get('healthcheck', undefined, timeout)
    if (!response) {
      throw new Error('Healthcheck response body is missing')
    }
    return parseHealthcheckResponse(response)
  }

  public async stop (): Promise<void> {
    await this.http.post('stop')
  }

  public async identitiesList (): Promise<IdentityDTO[]> {
    const response = await this.http.get('identities')
    if (!response) {
      throw new Error('Identities response body is missing')
    }
    const responseDto = parseIdentitiesResponseDTO(response)

    return responseDto.identities
  }

  public async identityCreate (passphrase: string): Promise<IdentityDTO> {
    const response = await this.http.post('identities', { passphrase })
    if (!response) {
      throw new Error('Identities creation response body is missing')
    }
    return parseIdentityDTO(response)
  }

  public async identityUnlock (id: string, passphrase: string, timeout?: number): Promise<void> {
    await this.http.put('identities/' + id + '/unlock', { passphrase }, timeout)
  }

  public async identityRegistration (id: string): Promise<IdentityRegistrationDTO> {
    const response = await this.http.get(`identities/${id}/registration`)
    if (!response) {
      throw new Error('Identities registration response body is missing')
    }
    return parseIdentityRegistrationDTO(response)
  }

  public async findProposals (options?: ProposalQueryOptions): Promise<ProposalDTO[]> {
    const params = options ? new ProposalsQuery(options).toQueryParams() : undefined
    const response = await this.http.get('proposals', params)
    if (!response) {
      throw new Error('Proposals response body is missing')
    }
    const responseDto = parseProposalsResponseDTO(response)
    const proposals = responseDto.proposals

    return proposals || []
  }

  public async connectionCreate (
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

  public async connectionStatus (): Promise<ConnectionStatusDTO> {
    const response = await this.http.get('connection')
    if (!response) {
      throw new Error('Connection status response body is missing')
    }
    return parseConnectionStatusDTO(response)
  }

  public async connectionCancel (): Promise<void> {
    await this.http.delete('connection')
  }

  public async connectionIP (timeout?: number): Promise<ConnectionIPDTO> {
    const response = await this.http.get('connection/ip', undefined, timeout)
    if (!response) {
      throw new Error('Connection IP response body is missing')
    }
    return parseConnectionIPDTO(response)
  }

  public async connectionStatistics (): Promise<ConnectionStatisticsDTO> {
    const response = await this.http.get('connection/statistics')
    if (!response) {
      throw new Error('Connection statistics response body is missing')
    }
    return parseConnectionStatisticsDTO(response)
  }

  public async location (timeout?: number): Promise<ConsumerLocationDTO> {
    const response = await this.http.get('location', undefined, timeout)
    if (!response) {
      throw new Error('Location response body is missing')
    }
    return parseConsumerLocationDTO(response)
  }
}
