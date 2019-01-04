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

declare module 'mysterium-tequilapi' {
  export type ConnectionStatus = 'Connected' | 'NotConnected' | 'Disconnecting' | 'Connecting'

  export const enum ConnectionStatusEnum {
    CONNECTED = 'Connected',
    NOT_CONNECTED = 'NotConnected',
    DISCONNECTING = 'Disconnecting',
    CONNECTING = 'Connecting'
  }

  export class TequilapiError extends Error {
    constructor (originalError: Error, path: string)

    get code (): string | undefined

    get isTimeoutError (): boolean

    get isRequestClosedError (): boolean

    get isServiceUnavailableError (): boolean
  }

  type HttpQueryParams = {
    [name: string]: any
  }

  export type ProposalQueryOptions = {
    fetchConnectCounts?: boolean,
    providerId?: string,
  }

  export type ConnectionStatusDTO = {
    status: ConnectionStatus
    sessionId?: string
  }

  export type ConnectionStatisticsDTO = {
    duration: number
    bytesReceived: number
    bytesSent: number
  }

  export type LocationDTO = {
    country: string
  }

  export type ServiceDefinitionDTO = {
    locationOriginate?: LocationDTO
  }

  export type MetricsDTO = {
    connectCount?: {
      success: number,
      fail: number,
      timeout: number
    }
  }

  export type ProposalDTO = {
    id: string
    providerId: string
    serviceType: string
    serviceDefinition?: ServiceDefinitionDTO
    metrics?: MetricsDTO
  }


  export type IdentityDTO = {
    id: string
  }

  export type ConnectionIPDTO = {
    ip: string
  }

  export type ConnectionRequestDTO = {
    consumerId: string
    providerId: string
    providerCountry: string
  }

  export type NodeBuildInfoDTO = {
    commit: string
    branch: string
    buildNumber: string
  }

  export type NodeHealthcheckDTO = {
    uptime: string,
    process: number,
    version: string,
    buildInfo: NodeBuildInfoDTO
  }


  export type PublicKeyDTO = {
    part1: string
    part2: string
  }

  export type SignatureDTO = {
    r: string
    s: string
    v: number
  }

  export type IdentityRegistrationDTO = {
    registered: boolean
    publicKey: PublicKeyDTO
    signature: SignatureDTO
  }


  export type ConsumerLocationDTO = {
    originalCountry: string
    originalIP: string
    currentCountry: string
    currentIP: string
  }

  export interface TequilapiClient {
    healthCheck (timeout?: number): Promise<NodeHealthcheckDTO>,

    stop (): Promise<void>,

    identitiesList (): Promise<Array<IdentityDTO>>,

    identityCreate (passphrase: string): Promise<IdentityDTO>,

    identityUnlock (id: string, passphrase: string): Promise<void>,

    identityRegistration (id: string): Promise<IdentityRegistrationDTO>,

    findProposals (queryOptions?: ProposalQueryOptions): Promise<Array<ProposalDTO>>,

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
