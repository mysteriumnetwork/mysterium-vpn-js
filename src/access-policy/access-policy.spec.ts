/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { parseAccessPolicyList, parseAccessPolicy } from './access-policy'

describe('.parseAccessPolicyList', () => {
  const accessPolicy = {
    id: 'mysterium',
    title: 'mysterium verified',
    description: 'mysterium access list',
    allow: [
      {
        type: 'identity',
        value: '0x2',
      },
    ],
  }

  it('sets properties with full structure', async () => {
    const services = parseAccessPolicyList({ entries: [accessPolicy] })

    expect(services).toHaveLength(1)
    expect(services[0]).toEqual(parseAccessPolicy(accessPolicy))
  })

  it('sets properties with an empty structure', async () => {
    const services = parseAccessPolicyList({ entries: [] })
    expect(services).toEqual([])
  })

  it('throws an error if services in array does not validate', async () => {
    expect(() => {
      parseAccessPolicyList({ entries: [{}] })
    }).toThrowError('AccessPolicy: id is not provided')
  })

  it('throws an error if access policy list in not an object', async () => {
    expect(() => {
      parseAccessPolicyList({})
    }).toThrowError('AccessPolicy[]: entries is not provided')
  })

  it('throws an error if service list in not an array', async () => {
    expect(() => {
      parseAccessPolicyList({ entries: {} })
    }).toThrowError('AccessPolicy[]: entries should be "array"')
  })
})
