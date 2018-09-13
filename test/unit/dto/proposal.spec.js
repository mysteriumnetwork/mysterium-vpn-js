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

import ProposalDTO from '../../../src/dto/proposal'
import ServiceDefinitionDTO from '../../../src/dto/service-definition'

describe('TequilapiClient DTO', () => {
  describe('ProposalDTO', () => {
    it('sets properties with full structure', async () => {
      const proposal = new ProposalDTO({
        id: 1,
        providerId: '0x1',
        serviceType: 'openvpn',
        serviceDefinition: {}
      })

      expect(proposal.id).to.equal(1)
      expect(proposal.providerId).to.equal('0x1')
      expect(proposal.serviceType).to.equal('openvpn')
      expect(proposal.serviceDefinition).to.deep.equal(new ServiceDefinitionDTO({}))
    })

    it('sets empty properties structure', async () => {
      const proposal = new ProposalDTO({})

      expect(proposal.id).to.be.undefined
      expect(proposal.providerId).to.be.undefined
      expect(proposal.serviceType).to.be.undefined
      expect(proposal.serviceDefinition).to.be.undefined
    })

    it('sets wrong properties structure', async () => {
      const proposal = new ProposalDTO('I am wrong')

      expect(proposal.id).to.be.undefined
      expect(proposal.providerId).to.be.undefined
      expect(proposal.serviceType).to.be.undefined
      expect(proposal.serviceDefinition).to.be.undefined
    })
  })
})
