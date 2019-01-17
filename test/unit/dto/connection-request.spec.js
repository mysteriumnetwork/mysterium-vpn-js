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

// @flow

import ConnectionRequestDTO from '../../../src/dto/connection-request'

describe('TequilapiClient DTO', () => {
  describe('ConnectionRequestDTO', () => {
    it('sets properties', async () => {
      const request = new ConnectionRequestDTO('0x1000FACE', '0x2000FACE', 'openvpn')

      expect(request.consumerId).to.equal('0x1000FACE')
      expect(request.providerId).to.equal('0x2000FACE')
      expect(request.serviceType).to.equal('openvpn')
    })
  })
})
