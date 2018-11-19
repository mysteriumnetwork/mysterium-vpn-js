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
    const proposalObject = {
      id: 1,
      providerId: '0x1',
      serviceType: 'openvpn',
      serviceDefinition: {}
    }

    it('sets properties with full structure', () => {
      const proposal = new ProposalDTO(proposalObject)

      expect(proposal.id).to.equal(1)
      expect(proposal.providerId).to.equal('0x1')
      expect(proposal.serviceType).to.equal('openvpn')
      expect(proposal.serviceDefinition).to.deep.equal(new ServiceDefinitionDTO({}))
      expect(proposal.metrics).to.be.null
    })

    it('throws error with null data', () => {
      const err = captureError(() => new ProposalDTO(null))
      expect(err).to.be.instanceOf(Error)
    })

    it('throws error with missing id', () => {
      const object = { ...proposalObject, id: undefined }
      const err = captureError(() => new ProposalDTO(object))
      if (!(err instanceof Error)) {
        throw Error('Error expected')
      }
      expect(err.message).to.eql('ProposalDTO id is not provided')
    })

    it('throws error with wrong id type', async () => {
      const object = { ...proposalObject, id: 'string id' }
      const err = captureError(() => new ProposalDTO(object))
      if (!(err instanceof Error)) {
        throw Error('Error expected')
      }
      expect(err.message).to.eql('ProposalDTO id should be "number" instead of "string"')
    })

    it('throws error with missing providerId', () => {
      const object = { ...proposalObject, providerId: undefined }
      const err = captureError(() => new ProposalDTO(object))
      if (!(err instanceof Error)) {
        throw Error('Error expected')
      }
      expect(err.message).to.eql('ProposalDTO providerId is not provided')
    })

    it('throws error with wrong providerId type', () => {
      const object = { ...proposalObject, providerId: 2 }
      const err = captureError(() => new ProposalDTO(object))
      expect(err).to.be.instanceOf(Error)
    })

    it('throws error with no serviceType', () => {
      const object = { ...proposalObject, serviceType: undefined }
      const err = captureError(() => new ProposalDTO(object))
      expect(err).to.be.instanceOf(Error)
    })

    it('throws error with invalid serviceDefinition', () => {
      const object = { ...proposalObject, serviceDefinition: '2' }
      const err = captureError(() => new ProposalDTO(object))
      expect(err).to.be.instanceOf(Error)
    })
  })
})
