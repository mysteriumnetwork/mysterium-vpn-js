/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validate, validateMultiple } from '../fmt/validation'

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

export interface Stats {
  count: number
  countConsumers: number
  sumBytesReceived: number
  sumBytesSent: number
  sumDuration: number
  sumTokens: number
}

export interface Pagination {
  totalItems: number
  totalPages: number
  currentPage: number
  previousPage: number
  nextPage: number
}

export interface SessionResponse {
  sessions: Session[]
  stats: Stats
  statsDaily: {
    [date: string]: Stats
  }
  paging: Pagination
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

export function parseSessionResponse(responseData: any): SessionResponse {
  validate('Session[]', responseData, { name: 'sessions', type: 'array' })
  validate('Pagination', responseData, { name: 'paging', type: 'object' })
  validate('Stats', responseData, { name: 'stats', type: 'object' })
  validate('[date: string]: Stats', responseData, { name: 'statsDaily', type: 'object' })

  validateMultiple('Stats', responseData.stats, [
    { name: 'count', type: 'number' },
    { name: 'countConsumers', type: 'number' },
    { name: 'sumBytesReceived', type: 'number' },
    { name: 'sumBytesSent', type: 'number' },
    { name: 'sumDuration', type: 'number' },
    { name: 'sumTokens', type: 'number' },
  ])

  Object.keys(responseData.statsDaily).forEach((key) => {
    validateMultiple('[date: string]: Stats', responseData.statsDaily, [
      { name: key, type: 'object' },
    ])
    validateMultiple('statsDaily entry', responseData.statsDaily[key], [
      { name: 'count', type: 'number' },
      { name: 'countConsumers', type: 'number' },
      { name: 'sumBytesReceived', type: 'number' },
      { name: 'sumBytesSent', type: 'number' },
      { name: 'sumDuration', type: 'number' },
      { name: 'sumTokens', type: 'number' },
    ])
  })

  validateMultiple('Paging', responseData.paging, [
    { name: 'totalItems', type: 'number' },
    { name: 'totalPages', type: 'number' },
    { name: 'currentPage', type: 'number' },
  ])

  if (responseData.paging.previousPage) {
    validate('number', responseData.paging.previousPage, { name: 'previousPage', type: 'number' });
  }
  if (responseData.paging.nextPage) {
    validate('number', responseData.paging.nextPage, { name: 'nextPage', type: 'number' });
  }

  return {
    sessions: responseData.sessions.map(parseSession),
    stats: responseData.stats,
    statsDaily: responseData.statsDaily,
    paging: responseData.paging,
  }
}
