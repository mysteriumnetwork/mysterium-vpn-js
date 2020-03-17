/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
