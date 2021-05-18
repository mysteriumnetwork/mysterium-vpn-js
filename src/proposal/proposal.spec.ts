/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { parseProposal, Proposal } from './proposal'

describe('.parseProposal', () => {
  const proposalObject: Proposal = {
    format: 'service-proposal/v2',
    compatibility: 1,
    providerId: '0x1',
    serviceType: 'openvpn',
    location: {
      country: 'US',
      ipType: 'residential',
      city: 'New Jersey',
      isp: 'Verizon',
    },
    price: {
      currency: 'MYST',
      perHour: 1000,
      perGib: 5000,
    },
    quality: {
      quality: 2,
      latency: 50,
      bandwidth: 10,
    },
  }

  it('sets properties with full structure', () => {
    const proposal = parseProposal(proposalObject)

    expect(proposal.providerId).toEqual('0x1')
    expect(proposal.serviceType).toEqual('openvpn')
    expect(proposal.location.country).toEqual('US')
    expect(proposal.price.perGib).toEqual(5000)
    expect(proposal.quality?.latency).toEqual(50)
  })

  it('throws error with null data', () => {
    expect(() => parseProposal(null)).toThrowError()
  })

  it('throws error with missing providerId', () => {
    const object = { ...proposalObject, providerId: undefined }
    expect(() => parseProposal(object)).toThrowError('Proposal: providerId is not provided')
  })

  it('throws error with wrong providerId type', () => {
    const object = { ...proposalObject, providerId: 1 }
    expect(() => parseProposal(object)).toThrowError('Proposal: providerId should be "string"')
  })

  it('throws error with no serviceType', () => {
    const object = { ...proposalObject, serviceType: undefined }
    expect(() => parseProposal(object)).toThrowError()
  })
})
