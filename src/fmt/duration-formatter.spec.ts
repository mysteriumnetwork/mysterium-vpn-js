/*
 * Copyright (C) 2019 The "mysteriumnetwork/mysterium-vpn-js" Authors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
