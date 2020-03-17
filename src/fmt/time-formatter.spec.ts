/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TimeFormatter } from './time-formatter'

describe('TimeFormatter', () => {
  let formatter: TimeFormatter

  beforeEach(() => {
    formatter = new TimeFormatter(-120)
  })

  describe('.getCurrentgetCurrentISODateTimegetCurrentISODateTimeDateTime', () => {
    it('returns a string representing current time', () => {
      const current = formatter.getCurrentISODateTime()

      expect(Date.parse(current)).not.toBeNaN()
    })
  })

  describe('.formatISODateTime', () => {
    const datetime = new Date(Date.parse('04 Dec 1995 00:12:00 GMT'))

    it('returns ISO formatted string from datetime number', () => {
      expect(formatter.formatISODateTime(datetime)).toEqual('1995-12-04T00:12:00.000Z')
    })
  })

  describe('.formatTime', () => {
    it('returns readable time in given timezone', () => {
      const date = new Date(Date.UTC(2018, 8, 24, 14, 3, 55))
      expect(formatter.formatTime(date)).toEqual('16:03:55')
    })
  })

  describe('.formatDate', () => {
    it('returns readable date', () => {
      const date = new Date(Date.UTC(2018, 8, 24, 14, 3, 55))
      expect(formatter.formatDate(date)).toEqual('24/09/2018')
    })

    it('returns different day when day differs for given timezone offset', () => {
      const date = new Date(Date.UTC(2018, 8, 24, 23, 3, 55))
      expect(formatter.formatDate(date)).toEqual('25/09/2018')
    })
  })
})
