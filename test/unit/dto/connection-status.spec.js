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

import ConnectionStatusDTO from '../../../src/dto/connection-status'
import ConnectionStatusEnum from '../../../src/dto/connection-status-enum'

describe('TequilapiClient DTO', () => {
  describe('ConnectionStatusDTO', () => {
    it('sets properties', async () => {
      const connection = new ConnectionStatusDTO({
        status: 'Connected',
        sessionId: 'My-super-session'
      })

      expect(connection.status).to.equal(ConnectionStatusEnum.CONNECTED)
      expect(connection.sessionId).to.equal('My-super-session')
    })

    it('sets empty properties', async () => {
      const connection = new ConnectionStatusDTO({})

      expect(connection.status).to.be.undefined
      expect(connection.sessionId).to.be.undefined
    })

    it('sets wrong properties', async () => {
      const connection = new ConnectionStatusDTO('I am wrong')

      expect(connection.status).to.be.undefined
      expect(connection.sessionId).to.be.undefined
    })
  })
})
