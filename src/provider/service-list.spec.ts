/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { parseServiceInfo, parseServiceListResponse } from './service-info'

describe('.parseServiceListResponse', () => {
  const proposalObject = {
    id: 1,
    providerId: '0x1',
    serviceType: 'openvpn',
    serviceDefinition: {},
    paymentMethod: {
      type: 'BYTES_TRANSFERRED_WITH_TIME',
    },
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
    const services = parseServiceListResponse([serviceObject])

    expect(services).toHaveLength(1)
    expect(services[0]).toEqual(parseServiceInfo(serviceObject))
  })

  it('sets properties with an empty structure', async () => {
    const services = parseServiceListResponse([])
    expect(services).toEqual([])
  })

  it('throws an error if services in array does not validate', async () => {
    expect(() => {
      parseServiceListResponse([{}])
    }).toThrowError('ServiceInfo: id is not provided')
  })

  it('throws an error if service list in not an array', async () => {
    expect(() => {
      parseServiceListResponse({})
    }).toThrowError('ServiceInfo[]: should be "array"')
  })
})
