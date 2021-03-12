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
}

export const qualityLevel = (q: { quality?: number } | undefined): QualityLevel | undefined => {
  if (q?.quality == null) {
    return undefined
  }
  if (q.quality >= QualityLevel.HIGH) {
    return QualityLevel.HIGH
  }
  if (q.quality >= QualityLevel.MEDIUM) {
    return QualityLevel.MEDIUM
  }
  return QualityLevel.LOW
}
