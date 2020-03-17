/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validateMultiple } from '../fmt/validation'

export interface ConnectionStatistics {
  duration: number
  bytesReceived: number
  bytesSent: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseConnectionStatistics(data: any): ConnectionStatistics {
  validateMultiple('ConnectionStatistics', data, [
    { name: 'duration', type: 'number' },
    { name: 'bytesReceived', type: 'number' },
    { name: 'bytesSent', type: 'number' },
  ])
  return data
}
