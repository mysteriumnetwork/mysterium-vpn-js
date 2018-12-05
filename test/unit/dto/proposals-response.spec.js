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

import { parseProposalsResponseDTO } from '../../../src/dto/proposals-response'
import { captureError } from '../../helpers/utils'

describe('.parseProposalsResponseDTO', () => {
  it('sets properties with full structure', async () => {
    const response = parseProposalsResponseDTO({
      proposals: [{ id: 100, providerId: 'id', serviceType: 'type', serviceDefinition: {} }]
    })

    expect(response.proposals).to.have.lengthOf(1)
    expect(response.proposals[0].id).to.equal(100)
  })

  it('throws error when invoked with an empty object', async () => {
    const error = captureError(() => parseProposalsResponseDTO({}))

    expect(error.message).to.eql('ProposalResponseDTO: proposals is not provided')
  })

  it('throws an error if proposal in array does not validate', async () => {
    const error = captureError(() => parseProposalsResponseDTO({ proposals: [{}] }))

    expect(error.message).to.eql('ProposalDTO: id is not provided')
  })
})
