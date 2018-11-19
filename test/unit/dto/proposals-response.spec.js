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

import ProposalsResponseDTO from '../../../src/dto/proposals-response'

describe('TequilapiClient DTO', () => {
  describe('ProposalsResponseDTO', () => {
    it('sets properties with full structure', async () => {
      const response = new ProposalsResponseDTO({
        proposals: [{ id: 100, providerId: 'id', serviceType: 'type', serviceDefinition: {} }]
      })

      expect(response.proposals).to.have.lengthOf(1)
      expect(response.proposals[0].id).to.equal(100)
    })

    it('sets empty properties structure', async () => {
      const response = new ProposalsResponseDTO({})

      expect(response.proposals).to.be.undefined
    })

    it('sets wrong properties structure', async () => {
      const response = new ProposalsResponseDTO('I am wrong')

      expect(response.proposals).to.be.undefined
    })
  })
})
