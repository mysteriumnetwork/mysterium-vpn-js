/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ProposalMetrics } from '../proposal/metrics'
import { QualityLevel } from './quality'
import { QualityCalculator } from './quality'

describe('QualityCalculator', () => {
  let qualityCalculator: QualityCalculator

  beforeEach(() => {
    qualityCalculator = new QualityCalculator()
  })

  describe('.calculateValue', () => {
    it('returns 1 for successful metrics', () => {
      const metrics: ProposalMetrics = { connectCount: { success: 1, fail: 0, timeout: 0 } }
      expect(qualityCalculator.calculateValue(metrics)).toEqual(1)
    })

    it('returns 0 for failure metrics', () => {
      const metrics1: ProposalMetrics = { connectCount: { success: 0, fail: 1, timeout: 0 } }
      expect(qualityCalculator.calculateValue(metrics1)).toEqual(0)

      const metrics2: ProposalMetrics = { connectCount: { success: 0, fail: 0, timeout: 1 } }
      expect(qualityCalculator.calculateValue(metrics2)).toEqual(0)
    })

    it('returns null when all metrics are zero', () => {
      const metrics1: ProposalMetrics = { connectCount: { success: 0, fail: 0, timeout: 0 } }
      expect(qualityCalculator.calculateValue(metrics1)).toBeNull()
    })
  })

  describe('.calculateLevel', () => {
    it('returns quality level according to value', () => {
      expect(qualityCalculator.calculateLevel(0.1)).toEqual(QualityLevel.LOW)
      expect(qualityCalculator.calculateLevel(0.3)).toEqual(QualityLevel.MEDIUM)
      expect(qualityCalculator.calculateLevel(0.6)).toEqual(QualityLevel.HIGH)
      expect(qualityCalculator.calculateLevel(null)).toEqual(QualityLevel.UNKNOWN)
    })
  })
})
