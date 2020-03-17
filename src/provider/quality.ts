/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Metrics } from '../metric/metrics'

const MEDIUM_QUALITY = 0.2
const HIGH_QUALITY = 0.5

/**
 * Indicates proposal level of quality.
 */
export enum QualityLevel {
  LOW,
  MEDIUM,
  HIGH,
  UNKNOWN,
}

export class QualityCalculator {
  /**
   * Calculates quality number for given metrics.
   *
   * @return number between 0 and 1. If metrics are empty, null is returned.
   */
  public calculateValue(metrics: Metrics): number | null {
    const counts = metrics.connectCount || { success: 0, fail: 0, timeout: 0 }
    const total = counts.success + counts.fail + counts.timeout

    if (total === 0) {
      return null
    }

    return counts.success / total
  }

  public calculateLevel(quality: number | null): QualityLevel {
    if (quality === null) {
      return QualityLevel.UNKNOWN
    }
    if (quality >= HIGH_QUALITY) {
      return QualityLevel.HIGH
    }
    if (quality >= MEDIUM_QUALITY) {
      return QualityLevel.MEDIUM
    }
    return QualityLevel.LOW
  }
}
