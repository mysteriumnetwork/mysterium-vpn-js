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

import { parseProposal } from './proposal'

describe('.parseProposal', () => {
  const proposalObject = {
    id: 1,
    providerId: '0x1',
    serviceType: 'openvpn',
    serviceDefinition: {},
  }

  it('sets properties with full structure', () => {
    const proposal = parseProposal(proposalObject)

    expect(proposal.id).toEqual(1)
    expect(proposal.providerId).toEqual('0x1')
    expect(proposal.serviceType).toEqual('openvpn')
    expect(proposal.serviceDefinition).toEqual({ locationOriginate: undefined })
    expect(proposal.metrics).toBeUndefined()
  })

  it('throws error with null data', () => {
    expect(() => parseProposal(null)).toThrowError()
  })

  it('throws error with missing id', () => {
    const object = { ...proposalObject, id: undefined }
    expect(() => parseProposal(object)).toThrowError('Proposal: id is not provided')
  })

  it('throws error with wrong id type', () => {
    const object = { ...proposalObject, id: 'string id' }
    expect(() => parseProposal(object)).toThrowError('Proposal: id should be "number"')
  })

  it('throws error with missing providerId', () => {
    const object = { ...proposalObject, providerId: undefined }
    expect(() => parseProposal(object)).toThrowError('Proposal: providerId is not provided')
  })

  it('throws error with wrong providerId type', () => {
    const object = { ...proposalObject, providerId: 2 }
    expect(() => parseProposal(object)).toThrowError()
  })

  it('throws error with no serviceType', () => {
    const object = { ...proposalObject, serviceType: undefined }
    expect(() => parseProposal(object)).toThrowError()
  })

  it('throws error with invalid serviceDefinition', () => {
    const object = { ...proposalObject, serviceDefinition: '2' }
    expect(() => parseProposal(object)).toThrowError()
  })
})
