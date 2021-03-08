/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { parseProposal } from './proposal'

describe('.parseProposal', () => {
  const proposalObject = {
    id: 1,
    providerId: '0x1',
    serviceType: 'openvpn',
    serviceDefinition: {},
    paymentMethod: {
      type: 'BYTES_TRANSFERRED_WITH_TIME',
    },
  }

  it('sets properties with full structure', () => {
    const proposal = parseProposal(proposalObject)

    expect(proposal.id).toEqual(1)
    expect(proposal.providerId).toEqual('0x1')
    expect(proposal.serviceType).toEqual('openvpn')
    expect(proposal.serviceDefinition).toEqual({ locationOriginate: undefined })
    expect(proposal.paymentMethod).toEqual({ type: 'BYTES_TRANSFERRED_WITH_TIME' })
    expect(proposal.quality).toBeUndefined()
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
