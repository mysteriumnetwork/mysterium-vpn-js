/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DurationFormatter } from './duration-formatter'

describe('DurationFormatter', () => {
  const formatter = new DurationFormatter()

  describe('.format', () => {
    it('converts time correctly', () => {
      expect(formatter.format(60 * 60 + 60 + 1)).toEqual('01:01:01')
      expect(formatter.format(60 * 60 * 24 * 5)).toEqual('120:00:00')
    })
    it('throws invalid parameter types', () => {
      expect(() => formatter.format(null as any)).toThrowError('invalid input')
      expect(() => formatter.format(undefined as any)).toThrowError('invalid input')
      expect(() => formatter.format('some string' as any)).toThrowError('invalid input')
      expect(() => formatter.format(-10)).toThrowError('invalid input')
    })
  })

  describe('.formatOrDefault', () => {
    it('returns display value', () => {
      expect(formatter.formatOrDefault(60 * 60 + 60 + 1)).toEqual('01:01:01')
    })

    it('returns default value when parsing fails', () => {
      expect(formatter.formatOrDefault('a' as any)).toEqual('--:--:--')
    })
  })
})
