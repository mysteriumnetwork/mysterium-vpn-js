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

export function parseSessionList(responseData: any): Session[] {
  validate('Session[]', responseData, { name: 'sessions', type: 'array' })
  return responseData.sessions.map(parseSession)
}
