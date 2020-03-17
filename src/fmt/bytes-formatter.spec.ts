/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BytesFormatter } from './bytes-formatter'

describe('BytesFormatter', () => {
  const formatter = new BytesFormatter()

  describe('.format', () => {
    it('returns object with value (fixed 2 decimals) and units ', () => {
      const val = 123
      const result = formatter.format(val)
      expect(result.units).toEqual('B')
      expect(result.amount).toEqual('123.00')
    })

    it('calculates one Byte correctly', () => {
      const val = 1
      const result = formatter.format(val)
      expect(result.units).toEqual('B')
      expect(result.amount).toEqual('1.00')
    })

    it('calculates one KB correctly', () => {
      const val = 1024
      const result = formatter.format(val)
      expect(result.units).toEqual('KB')
      expect(result.amount).toEqual('1.00')
    })

    it('calculates one MB correctly', () => {
      const val = 1024 * 1024
      const result = formatter.format(val)
      expect(result.units).toEqual('MB')
      expect(result.amount).toEqual('1.00')
    })

    it('calculates one GB correctly', () => {
      const val = 1024 * 1024 * 1024
      const result = formatter.format(val)
      expect(result.units).toEqual('GB')
      expect(result.amount).toEqual('1.00')
    })

    it('calculates one TB correctly', () => {
      const val = 1024 * 1024 * 1024 * 1024
      const result = formatter.format(val)
      expect(result.units).toEqual('TB')
      expect(result.amount).toEqual('1.00')
    })

    it('returns 0', () => {
      expect(formatter.format(0).amount).toEqual('0.00')
    })
    it('throws', () => {
      expect(() => formatter.format(undefined as any)).toThrowError(
        'provide valid input for conversion'
      )
      expect(() => formatter.format('str' as any)).toThrowError(
        'provide valid input for conversion'
      )
    })
  })

  describe('.formatOrDefault', () => {
    it('returns readable value', () => {
      expect(formatter.formatOrDefault(10000)).toEqual({
        amount: '9.77',
        units: 'KB',
      })
    })

    it('returns default value when parsing fails', () => {
      expect(formatter.formatOrDefault('a' as any)).toEqual({
        amount: '-',
        units: 'KB',
      })
    })
  })
})
