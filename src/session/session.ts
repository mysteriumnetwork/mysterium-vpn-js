/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validate, validateMultiple } from '../fmt/validation'
import { Pagination, parsePagination } from '../common/pagination'

export enum SessionStatus {
  NEW = 'New',
  COMPLETED = 'Completed',
}

export enum SessionDirection {
  CONSUMED = 'Consumed',
  PROVIDED = 'Provided',
}

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

export interface SessionStats {
  count: number
  countConsumers: number
  sumBytesReceived: number
  sumBytesSent: number
  sumDuration: number
  sumTokens: number
}

export interface SessionListResponse {
  sessions: Session[]
  pagination: Pagination
  stats: SessionStats
  statsDaily: {
    [date: string]: SessionStats
  }
}

export interface SessionListQuery {
  dateFrom?: string
  dateTo?: string
  direction?: string
  serviceType?: string
  status?: string
  page?: number
  pageSize?: number
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

export function parseSessionListResponse(responseData: any): SessionListResponse {
  validate('Session[]', responseData, { name: 'sessions', type: 'array' })
  validate('Pagination', responseData, { name: 'pagination', type: 'object' })
  validate('SessionStats', responseData, { name: 'stats', type: 'object' })
  validate('[date: string]: StatsDaily', responseData, { name: 'statsDaily', type: 'object' })

  validateMultiple('SessionStats', responseData.stats, [
    { name: 'count', type: 'number' },
    { name: 'countConsumers', type: 'number' },
    { name: 'sumBytesReceived', type: 'number' },
    { name: 'sumBytesSent', type: 'number' },
    { name: 'sumDuration', type: 'number' },
    { name: 'sumTokens', type: 'number' },
  ])

  Object.keys(responseData.statsDaily).forEach((key) => {
    validateMultiple('[date: string]: StatsDaily', responseData.statsDaily, [
      { name: key, type: 'object' },
    ])
    validateMultiple('StatsDaily', responseData.statsDaily[key], [
      { name: 'count', type: 'number' },
      { name: 'countConsumers', type: 'number' },
      { name: 'sumBytesReceived', type: 'number' },
      { name: 'sumBytesSent', type: 'number' },
      { name: 'sumDuration', type: 'number' },
      { name: 'sumTokens', type: 'number' },
    ])
  })

  return {
    sessions: responseData.sessions.map(parseSession),
    pagination: parsePagination(responseData.pagination),
    stats: responseData.stats,
    statsDaily: responseData.statsDaily,
  }
}
