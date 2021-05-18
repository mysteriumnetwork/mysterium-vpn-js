/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { parseProposalList } from './proposal'

describe('.parseProposalList', () => {
  const proposalObject = {
    format: 'service-proposal/v2',
    compatibility: 0,
    providerId: '0x1',
    serviceType: 'type',
    location: {
      country: 'US',
    },
    price: {
      currency: 'MYST',
      perHour: 1,
      perGib: 0,
    },
  }

  it('sets properties with full structure', async () => {
    const response = parseProposalList({
      proposals: [proposalObject],
    })

    expect(response.proposals).toHaveLength(1)
    expect(response.proposals[0].providerId).toEqual('0x1')
  })

  it('throws error when invoked with an empty object', async () => {
    expect(() => parseProposalList({})).toThrowError('ProposalList: proposals is not provided')
  })

  it('throws an error if proposal in array does not validate', async () => {
    expect(() => parseProposalList({ proposals: [{}] })).toThrowError(
      'Proposal: format is not provided'
    )
  })
})
