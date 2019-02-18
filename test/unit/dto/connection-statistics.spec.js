/*
 * Copyright (C) 2017 The "mysteriumnetwork/mysterium-vpn" Authors.
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

import { parseConnectionStatisticsDTO } from '../../../src/dto/connection-statistics'

describe('TequilapiClient DTO', () => {
  describe('.parseConnectionStatisticsDTO', () => {
    it('sets properties', async () => {
      const stats = parseConnectionStatisticsDTO({
        duration: 13325,
        bytesReceived: 1232133, // 1.17505 MB
        bytesSent: 123321 // 0.117608 MB
      })

      expect(stats.duration).to.equal(13325)
      expect(stats.bytesReceived).to.equal(1232133)
      expect(stats.bytesSent).to.deep.equal(123321)
    })

    it('throws error without required fields', async () => {
      expect(() => parseConnectionStatisticsDTO({})).to.throw()
      expect(() => parseConnectionStatisticsDTO('I am wrong')).to.throw()
    })
  })
})
