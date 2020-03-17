/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validate, validateMultiple } from '../fmt/validation'

export interface ServiceSession {
  id: string
  consumerId: string
  createdAt: string
  bytesIn: number
  bytesOut: number
  tokensEarned: number
}

export function parseServiceSession(data: any): ServiceSession {
  validateMultiple('ServiceSession', data, [
    { name: 'id', type: 'string' },
    { name: 'consumerId', type: 'string' },
    { name: 'createdAt', type: 'string' },
    { name: 'bytesIn', type: 'number' },
    { name: 'bytesOut', type: 'number' },
    { name: 'tokensEarned', type: 'number' },
  ])
  return data
}

export function parseServiceSessionList(responseData: any): ServiceSession[] {
  validate('ServiceSession[]', responseData, { name: 'sessions', type: 'array' })
  return responseData.sessions.map(parseServiceSession)
}
