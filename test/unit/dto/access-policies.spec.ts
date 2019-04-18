/*
 * Copyright (C) 2019 The "mysteriumnetwork/js-tequilapi" Authors.
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

import { parseAccessPoliciesDTO, parseAccessPolicyDTO } from '../../../src/dto/access-policies'

describe('.parseAccessPoliciesDTO', () => {
  const accessPolicy = {
    id: 'mysterium',
    title: 'mysterium verified',
    description: 'mysterium access list',
    allow: [
      {
        type: 'identity',
        value: '0x2'
      }
    ]
  }

  it('sets properties with full structure', async () => {
    const services = parseAccessPoliciesDTO({ entries: [accessPolicy] })

    expect(services).toHaveLength(1)
    expect(services[0]).toEqual(parseAccessPolicyDTO(accessPolicy))
  })

  it('sets properties with an empty structure', async () => {
    const services = parseAccessPoliciesDTO({ entries: [] })
    expect(services).toEqual([])
  })

  it('throws an error if services in array does not validate', async () => {
    expect(() => {
      parseAccessPoliciesDTO({ entries: [{}] })
    }).toThrowError('AccessPolicyDTO: id is not provided')
  })

  it('throws an error if access policy list in not an object', async () => {
    expect(() => {
      parseAccessPoliciesDTO({})
    }).toThrowError('AccessPolicyDTO[]: entries is not provided')
  })

  it('throws an error if service list in not an array', async () => {
    expect(() => {
      parseAccessPoliciesDTO({ entries: {} })
    }).toThrowError('AccessPolicyDTO[]: entries should be "array"')
  })
})
