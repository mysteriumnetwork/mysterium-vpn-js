/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { QualityLevel } from './quality'
import { QualityCalculator } from './quality'

describe('QualityCalculator', () => {
  let qualityCalculator: QualityCalculator

  beforeEach(() => {
    qualityCalculator = new QualityCalculator()
  })

  describe('.calculateLevel', () => {
    it('returns quality level according to value', () => {
      expect(qualityCalculator.calculateLevel(0.1)).toEqual(QualityLevel.LOW)
      expect(qualityCalculator.calculateLevel(1.0)).toEqual(QualityLevel.MEDIUM)
      expect(qualityCalculator.calculateLevel(1.1)).toEqual(QualityLevel.MEDIUM)
      expect(qualityCalculator.calculateLevel(2.0)).toEqual(QualityLevel.HIGH)
      expect(qualityCalculator.calculateLevel(2.1)).toEqual(QualityLevel.HIGH)
      expect(qualityCalculator.calculateLevel(null)).toEqual(QualityLevel.UNKNOWN)
    })
  })
})
