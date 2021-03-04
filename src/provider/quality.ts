/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Indicates proposal level of quality.
 */
export enum QualityLevel {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
  UNKNOWN,
}

export class QualityCalculator {
  public calculateLevel(quality: number | null): QualityLevel {
    if (quality === null) {
      return QualityLevel.UNKNOWN
    }
    if (quality >= QualityLevel.HIGH) {
      return QualityLevel.HIGH
    }
    if (quality >= QualityLevel.MEDIUM) {
      return QualityLevel.MEDIUM
    }
    return QualityLevel.LOW
  }
}
