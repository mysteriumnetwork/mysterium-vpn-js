/*
 * Copyright (C) 2018 The "mysteriumnetwork/mysterium-vpn" Authors.
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

// TypeScript Version: 2.8

declare module 'mysterium-tequilapi' {
  type ConnectionStatus = 'Connected' | 'NotConnected' | 'Disconnecting' | 'Connecting'

  const enum ConnectionStatusEnum {
    CONNECTED = 'Connected',
    NOT_CONNECTED = 'NotConnected',
    DISCONNECTING = 'Disconnecting',
    CONNECTING = 'Connecting'
  }

  class TequilapiError extends Error {
    constructor (originalError: Error, path: string)

    code: string | undefined
    isTimeoutError: boolean
    isRequestClosedError: boolean
    isServiceUnavailableError: boolean
  }

  type HttpQueryParams = {
    [name: string]: any
  }

  type ProposalQueryOptions = {
    providerId?: string,
    serviceType?: string,
    fetchConnectCounts?: boolean,
  }

  type ConnectionStatusDTO = {
    status: ConnectionStatus
    sessionId?: string
  }

  type ConnectionStatisticsDTO = {
    duration: number
    bytesReceived: number
    bytesSent: number
  }

  type LocationDTO = {
    country: string
  }

  type ServiceDefinitionDTO = {
    locationOriginate?: LocationDTO
  }

  type MetricsDTO = {
    connectCount?: {
      success: number,
      fail: number,
      timeout: number
    }
  }

  type ProposalDTO = {
    id: string
    providerId: string
    serviceType: string
    serviceDefinition?: ServiceDefinitionDTO
    metrics?: MetricsDTO
  }

  type IdentityDTO = {
    id: string
  }

  type ConnectionIPDTO = {
    ip: string
  }

  type ConnectionRequestDTO = {
    consumerId: string
    providerId: string
    providerCountry: string
    serviceType: string
  }

  type NodeBuildInfoDTO = {
    commit: string
    branch: string
    buildNumber: string
  }

  type NodeHealthcheckDTO = {
    uptime: string,
    process: number,
    version: string,
    buildInfo: NodeBuildInfoDTO
  }

  type PublicKeyDTO = {
    part1: string
    part2: string
  }

  type SignatureDTO = {
    r: string
    s: string
    v: number
  }

  type IdentityRegistrationDTO = {
    registered: boolean
    publicKey: PublicKeyDTO
    signature: SignatureDTO
  }

  type ConsumerLocationDTO = {
    originalCountry: string
    originalIP: string
    currentCountry: string
    currentIP: string
  }

  interface TequilapiClient {
    healthCheck (timeout?: number): Promise<NodeHealthcheckDTO>,

    stop (): Promise<void>,

    identitiesList (): Promise<IdentityDTO[]>,

    identityCreate (passphrase: string): Promise<IdentityDTO>,

    identityUnlock (id: string, passphrase: string): Promise<void>,

    identityRegistration (id: string): Promise<IdentityRegistrationDTO>,

    findProposals (queryOptions?: ProposalQueryOptions): Promise<ProposalDTO[]>,

    connectionCreate (request: ConnectionRequestDTO, timeout?: number): Promise<ConnectionStatusDTO>,

    connectionStatus (): Promise<ConnectionStatusDTO>,

    connectionCancel (): Promise<void>,

    connectionIP (timeout?: number): Promise<ConnectionIPDTO>,

    connectionStatistics (): Promise<ConnectionStatisticsDTO>,

    location (timeout?: number): Promise<ConsumerLocationDTO>
  }

  export default class TequilapiClientFactory {
    constructor (baseUrl: string, defaultTimeout: number)

    build (): TequilapiClient
  }
}
