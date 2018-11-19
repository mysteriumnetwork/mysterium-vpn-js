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
import { captureError } from '../../helpers/utils'

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

    it('throws error with null data', () => {
      const err = captureError(() => new ProposalDTO(null))
      expect(err).to.be.instanceOf(Error)
    })

    it('throws error with missing id', () => {
      const err = captureError(() => new ProposalDTO({}))
      expect(err).to.be.instanceOf(Error)
    })

    it('throws error with wrong id type', async () => {
      const err = captureError(() => new ProposalDTO({
        id: 'string id', providerId: 'provider id'
      }))
      expect(err).to.be.instanceOf(Error)
    })

    it('throws error with missing providerId', () => {
      const err = captureError(() => new ProposalDTO({
        id: 1
      }))
      if (!(err instanceof Error)) {
        throw Error('Error expected')
      }
      expect(err.message).to.eql('ProposalDTO providerId is not provided')
    })

    it('throws error with wrong providerId type', () => {
      const err = captureError(() => new ProposalDTO({
        id: 1, providerId: 2
      }))
      expect(err).to.be.instanceOf(Error)
    })

    it('throws error with no serviceType', () => {
      const err = captureError(() => new ProposalDTO({
        id: 1, providerId: 'provider id'
      }))
      expect(err).to.be.instanceOf(Error)
    })

    it('throws error with invalid serviceDefinition', () => {
      const err = captureError(() => new ProposalDTO({
        id: 1, providerId: 'provider id', serviceType: '', serviceDefinition: null
      }))
      expect(err).to.be.instanceOf(Error)
    })

    xit('sets wrong properties structure', async () => {
      const proposal = new ProposalDTO('I am wrong')

      expect(proposal.id).to.be.undefined
      expect(proposal.providerId).to.be.undefined
      expect(proposal.serviceType).to.be.undefined
      expect(proposal.serviceDefinition).to.be.undefined
    })
  })
})
