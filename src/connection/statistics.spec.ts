/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { parseConnectionStatistics } from './statistics'

describe('TequilapiClient DTO', () => {
  describe('.parseConnectionStatistics', () => {
    it('sets properties', async () => {
      const stats = parseConnectionStatistics({
        duration: 13325,
        bytesReceived: 1232133, // 1.17505 MB
        bytesSent: 123321, // 0.117608 MB
        tokensSpent: 100,
      })

      expect(stats.duration).toEqual(13325)
      expect(stats.bytesReceived).toEqual(1232133)
      expect(stats.bytesSent).toEqual(123321)
      expect(stats.tokensSpent).toEqual(100)
    })

    it('throws error without required fields', async () => {
      expect(() => parseConnectionStatistics({})).toThrow()
      expect(() => parseConnectionStatistics('I am wrong')).toThrow()
    })
  })
})
