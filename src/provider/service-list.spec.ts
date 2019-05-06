/*
 * Copyright (C) 2019 The "mysteriumnetwork/mysterium-vpn-js" Authors.
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

import { parseServiceInfo, parseServiceInfoList } from './service-info'

describe('.parseServiceInfoList', () => {
  const proposalObject = {
    id: 1,
    providerId: '0x1',
    serviceType: 'openvpn',
    serviceDefinition: {},
  }
  const serviceObject = {
    id: 'service1',
    providerId: '0x1',
    type: 'openvpn',
    options: { foo: 'bar' },
    status: 'Running',
    proposal: proposalObject,
  }

  it('sets properties with full structure', async () => {
    const services = parseServiceInfoList([serviceObject])

    expect(services).toHaveLength(1)
    expect(services[0]).toEqual(parseServiceInfo(serviceObject))
  })

  it('sets properties with an empty structure', async () => {
    const services = parseServiceInfoList([])
    expect(services).toEqual([])
  })

  it('throws an error if services in array does not validate', async () => {
    expect(() => {
      parseServiceInfoList([{}])
    }).toThrowError('ServiceInfo: id is not provided')
  })

  it('throws an error if service list in not an array', async () => {
    expect(() => {
      parseServiceInfoList({})
    }).toThrowError('ServiceInfo[]: should be "array"')
  })
})
