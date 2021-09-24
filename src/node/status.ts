/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validate } from '../fmt/validation'

export enum NodeMonitoringStatus {
  PASSED = 'passed',
  FAILED = 'failed',
  PENDING = 'pending',
}

export interface NodeMonitoringStatusResponse {
  status: NodeMonitoringStatus
}

export function parseNodeMonitoringStatus(data: any): NodeMonitoringStatusResponse {
  validate('NatStatusResponse', data, { name: 'status', type: 'string' })
  if (data.error) {
    validate('NatStatusResponse', data, { name: 'error', type: 'string' })
  }
  return data
}
