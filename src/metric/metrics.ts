/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ConnectionCount, parseConnectionCount } from '../connection/count'

export interface Metrics {
  connectCount?: ConnectionCount
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseMetrics(data: any): Metrics {
  try {
    return { connectCount: parseConnectionCount(data.connectCount) }
  } catch (err) {
    return { connectCount: undefined }
  }
}
