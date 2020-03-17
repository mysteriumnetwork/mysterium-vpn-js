/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validateMultiple } from '../fmt/validation'

export interface ConnectionSession {
  sessionId: string
  providerId: string
  providerCountry: string
  dateStarted: string
  bytesSent: number
  bytesReceived: number
  duration: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateSession(data: any): ConnectionSession {
  validateMultiple('ConnectionSession', data, [
    { name: 'sessionId', type: 'string' },
    { name: 'providerId', type: 'string' },
    { name: 'providerCountry', type: 'string' },
    { name: 'dateStarted', type: 'string' },
    { name: 'bytesSent', type: 'number' },
    { name: 'bytesReceived', type: 'number' },
    { name: 'duration', type: 'number' },
  ])
  return data
}
