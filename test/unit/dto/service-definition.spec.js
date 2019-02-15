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

import ServiceDefinitionDTO from '../../../src/dto/service-definition'

describe('TequilapiClient DTO', () => {
  describe('ServiceDefinitionDTO', () => {
    it('sets properties with full structure', async () => {
      const service = new ServiceDefinitionDTO({
        locationOriginate: {}
      })

      expect(service.locationOriginate).to.deep.equal({ country: undefined })
    })

    it('sets empty properties structure', async () => {
      const service = new ServiceDefinitionDTO({})

      expect(service.locationOriginate).to.be.undefined
    })

    it('sets wrong properties structure', async () => {
      const service = new ServiceDefinitionDTO('I am wrong')

      expect(service.locationOriginate).to.be.undefined
    })
  })
})
