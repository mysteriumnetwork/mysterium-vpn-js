/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validate, validateMultiple } from '../fmt/validation'
import { Pageable, PaginationQuery, parsePageable } from '../common/pageable'

/**
 * @deprecated use ProviderAPI
 */
export enum SessionStatus {
  NEW = 'New',
  COMPLETED = 'Completed',
}

/**
 * @deprecated use ProviderAPI
 */
export enum SessionDirection {
  CONSUMED = 'Consumed',
  PROVIDED = 'Provided',
}

/**
 * @deprecated use ProviderAPI
 */
export interface Session {
  id: string
  direction: SessionDirection
  consumerId: string
  hermesId: string
  providerId: string
  serviceType: string
  providerCountry: string
  consumerCountry: string
  createdAt: string
  duration: number
  bytesReceived: number
  bytesSent: number
  tokens: number
  status: SessionStatus
}

export function parseSession(data: any): Session {
  validateMultiple('Session', data, [
    { name: 'id', type: 'string' },
    { name: 'direction', type: 'string' },
    { name: 'consumerId', type: 'string' },
    { name: 'hermesId', type: 'string' },
    { name: 'providerId', type: 'string' },
    { name: 'serviceType', type: 'string' },
    { name: 'providerCountry', type: 'string' },
    { name: 'createdAt', type: 'string' },
    { name: 'duration', type: 'number' },
    { name: 'bytesReceived', type: 'number' },
    { name: 'bytesSent', type: 'number' },
    { name: 'tokens', type: 'number' },
    { name: 'status', type: 'string' },
  ])
  return data
}

/**
 * @deprecated use ProviderAPI
 */
export interface SessionStats {
  count: number
  countConsumers: number
  sumBytesReceived: number
  sumBytesSent: number
  sumDuration: number
  sumTokens: number
}

export function parseSessionStats(data: any): SessionStats {
  validateMultiple('SessionStats', data, [
    { name: 'count', type: 'number' },
    { name: 'countConsumers', type: 'number' },
    { name: 'sumBytesReceived', type: 'number' },
    { name: 'sumBytesSent', type: 'number' },
    { name: 'sumDuration', type: 'number' },
    { name: 'sumTokens', type: 'number' },
  ])
  return data
}

/**
 * @deprecated use ProviderAPI
 */
export interface SessionQuery {
  dateFrom?: string
  dateTo?: string
  direction?: SessionDirection
  consumerId?: string
  hermesId?: string
  providerId?: string
  serviceType?: string
  status?: SessionStatus
}

/**
 * @deprecated use ProviderAPI
 */
export interface SessionListQuery extends PaginationQuery, SessionQuery {}

/**
 * @deprecated use ProviderAPI
 */
export type SessionListResponse = Pageable<Session>

export function parseSessionListResponse(responseData: any): SessionListResponse {
  const response = parsePageable<Session>(responseData) as SessionListResponse
  response.items = responseData.items.map(parseSession)
  return response
}

/**
 * @deprecated use ProviderAPI
 */
export interface SessionStatsAggregatedResponse {
  stats: SessionStats
}

export function parseSessionStatsAggregatedResponse(data: any): SessionStatsAggregatedResponse {
  validate('SessionStatsAggregatedResponse', data, { name: 'stats', type: 'object' })

  return {
    stats: parseSessionStats(data.stats),
  }
}

/**
 * @deprecated use ProviderAPI
 */
export interface SessionStatsDailyResponse {
  items: {
    [date: string]: SessionStats
  }
  stats: SessionStats
}

export function parseSessionStatsDailyResponse(data: any): SessionStatsDailyResponse {
  validateMultiple('SessionStatsDailyResponse', data, [
    { name: 'items', type: 'object' },
    { name: 'stats', type: 'object' },
  ])

  const response = data as SessionStatsDailyResponse
  response.stats = parseSessionStats(data.stats)

  Object.keys(data.items).forEach((key) => {
    response.items[key] = parseSessionStats(data.items[key])
  })

  return response
}
