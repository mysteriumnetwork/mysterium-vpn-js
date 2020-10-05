/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  parseSession,
  parseSessionListResponse,
  parseSessionStatsAggregatedResponse,
  parseSessionStatsDailyResponse,
} from './session'

describe('TequilapiClient DTO', () => {
  const sessionData = {
    id: 'id1',
    direction: 'Provided',
    consumerId: '0x1',
    hermesId: '0x2',
    providerId: '0x3',
    serviceType: 'openvpn',
    providerCountry: 'MU',
    createdAt: '2019-01-01',
    duration: 59,
    bytesSent: 10,
    bytesReceived: 11,
    tokens: 4_000,
    status: 'New',
  }

  const stats = {
    count: 1,
    countConsumers: 2,
    sumBytesReceived: 3,
    sumBytesSent: 4,
    sumDuration: 5,
    sumTokens: 6,
  }

  const statDaily = {
    ['2020-09-02']: {
      count: 1,
      countConsumers: 2,
      sumBytesReceived: 3,
      sumBytesSent: 4,
      sumDuration: 5,
      sumTokens: 6,
    },
  }

  describe('.parseSession', () => {
    const sessionObject = parseSession(sessionData)

    it('sets properties', async () => {
      expect(sessionObject.id).toEqual('id1')
      expect(sessionObject.consumerId).toEqual('0x1')
    })

    it('throws error with null data', () => {
      expect(() => parseSession(null)).toThrowError()
    })

    it('throws error with missing id', () => {
      const object = { ...sessionData, id: undefined }
      expect(() => parseSession(object)).toThrowError('Session: id is not provided')
    })

    it('throws error with missing consumerId', () => {
      const object = { ...sessionData, consumerId: undefined }
      expect(() => parseSession(object)).toThrowError('Session: consumerId is not provided')
    })
  })

  describe('.parseSessionListResponse', () => {
    it('sets properties with full structure', async () => {
      const response = parseSessionListResponse({
        items: [sessionData],
        page: 1,
        pageSize: 50,
        totalItems: 1,
        totalPages: 1,
        stats: stats,
        statsDaily: statDaily,
      })

      expect(response.items).toHaveLength(1)
      expect(response.items[0].id).toEqual('id1')
      expect(response.items[0].consumerId).toEqual('0x1')

      expect(response.page).toEqual(1)
      expect(response.pageSize).toEqual(50)
      expect(response.totalItems).toEqual(1)
      expect(response.totalPages).toEqual(1)
    })

    it('throws error when invoked with an empty object', async () => {
      expect(() => {
        parseSessionListResponse({})
      }).toThrowError('Pageable: items is not provided')
    })

    it('throws an error if session in array does not validate', async () => {
      expect(() => {
        parseSessionListResponse({
          items: [{}],
          page: 1,
          pageSize: 50,
          totalItems: 1,
          totalPages: 1,
          stats: stats,
          statsDaily: statDaily,
        })
      }).toThrowError('Session: id is not provided')
    })
  })

  describe('.parseSessionStatsAggregatedResponse', () => {
    it('sets properties with full structure', async () => {
      const response = parseSessionStatsAggregatedResponse({
        stats: stats,
      })

      expect(response.stats.count).toEqual(1)
      expect(response.stats.countConsumers).toEqual(2)
      expect(response.stats.sumBytesReceived).toEqual(3)
      expect(response.stats.sumBytesSent).toEqual(4)
      expect(response.stats.sumDuration).toEqual(5)
      expect(response.stats.sumTokens).toEqual(6)
    })

    it('throws error when invoked with an empty object', async () => {
      expect(() => {
        parseSessionStatsAggregatedResponse({})
      }).toThrowError('SessionStatsAggregatedResponse: stats is not provided')
    })
  })

  describe('.parseSessionStatsDailyResponse', () => {
    it('sets properties with full structure', async () => {
      const response = parseSessionStatsDailyResponse({
        items: statDaily,
        stats: stats,
      })

      const statsDailyKeys = Object.keys(response.items)
      expect(statsDailyKeys).toHaveLength(1)

      const dailyStat = response.items[statsDailyKeys[0]]
      expect(dailyStat.count).toEqual(1)
      expect(dailyStat.countConsumers).toEqual(2)
      expect(dailyStat.sumBytesReceived).toEqual(3)
      expect(dailyStat.sumBytesSent).toEqual(4)
      expect(dailyStat.sumDuration).toEqual(5)
      expect(dailyStat.sumTokens).toEqual(6)

      expect(response.stats.count).toEqual(1)
      expect(response.stats.countConsumers).toEqual(2)
      expect(response.stats.sumBytesReceived).toEqual(3)
      expect(response.stats.sumBytesSent).toEqual(4)
      expect(response.stats.sumDuration).toEqual(5)
      expect(response.stats.sumTokens).toEqual(6)
    })

    it('throws error when invoked with an empty object', async () => {
      expect(() => {
        parseSessionStatsDailyResponse({})
      }).toThrowError('SessionStatsDailyResponse: items is not provided')
    })

    it('throws an error if items array does not validate', async () => {
      expect(() => {
        parseSessionStatsDailyResponse({
          items: [{}],
        })
      }).toThrowError('SessionStatsDailyResponse: items should be "object"')
    })
  })
})
