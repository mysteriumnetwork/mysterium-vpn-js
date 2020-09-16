/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validateMultiple } from '../fmt/validation'

export interface ProposalMetrics extends QualityMetrics {
  providerId: string
  serviceType: string
}

export interface QualityMetrics {
  connectCount: QualityMetricConnects
  monitoringFailed: boolean
}

export interface QualityMetricConnects {
  success: number
  fail: number
  timeout: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseQualityMetricConnects(data: any): QualityMetricConnects {
  validateMultiple('QualityMetricConnects', data, [
    { name: 'success', type: 'number' },
    { name: 'fail', type: 'number' },
  ])
  return data
}
