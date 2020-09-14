/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validateMultiple } from '../fmt/validation'

export interface ConnectionStatistics {
  bytesReceived: number
  bytesSent: number
  throughputSent: number
  throughputReceived: number
  duration: number
  tokensSpent: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseConnectionStatistics(data: any): ConnectionStatistics {
  validateMultiple('ConnectionStatistics', data, [
    { name: 'bytesReceived', type: 'number' },
    { name: 'bytesSent', type: 'number' },
    { name: 'throughputSent', type: 'number' },
    { name: 'throughputReceived', type: 'number' },
    { name: 'duration', type: 'number' },
    { name: 'tokensSpent', type: 'number' },
  ])
  return data
}
