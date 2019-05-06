/*
 * Copyright (C) 2017 The "mysteriumnetwork/mysterium-vpn-js" Authors.
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

import { parseProposalList } from './proposal'

describe('.parseProposalList', () => {
  it('sets properties with full structure', async () => {
    const response = parseProposalList({
      proposals: [{ id: 100, providerId: 'id', serviceType: 'type', serviceDefinition: {} }],
    })

    expect(response.proposals).toHaveLength(1)
    expect(response.proposals[0].id).toEqual(100)
  })

  it('throws error when invoked with an empty object', async () => {
    expect(() => parseProposalList({})).toThrowError('ProposalList: proposals is not provided')
  })

  it('throws an error if proposal in array does not validate', async () => {
    expect(() => parseProposalList({ proposals: [{}] })).toThrowError(
      'Proposal: id is not provided'
    )
  })
})
