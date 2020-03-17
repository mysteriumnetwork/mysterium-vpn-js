/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { parseServiceInfo } from './service-info'
import { ServiceStatus } from './service-status'

describe('TequilapiClient DTO', () => {
  describe('.parseServiceInfo', () => {
    const proposalObject = {
      id: 1,
      providerId: '0x1',
      serviceType: 'openvpn',
      serviceDefinition: {},
    }
    const serviceObject = parseServiceInfo({
      id: 'service1',
      providerId: '0x1',
      type: 'openvpn',
      options: { foo: 'bar' },
      status: 'Running',
      proposal: proposalObject,
    })

    it('sets properties', async () => {
      expect(serviceObject.id).toEqual('service1')
      expect(serviceObject.providerId).toEqual('0x1')
      expect(serviceObject.type).toEqual('openvpn')
      expect(serviceObject.options).toEqual({ foo: 'bar' })
      expect(serviceObject.status).toEqual(ServiceStatus.RUNNING)
      expect(serviceObject.proposal).toEqual(proposalObject)
    })

    it('throws error with null data', () => {
      expect(() => parseServiceInfo(null)).toThrowError()
    })

    it('throws error with missing id', () => {
      const object = { ...serviceObject, id: undefined }
      expect(() => parseServiceInfo(object)).toThrowError('ServiceInfo: id is not provided')
    })

    it('throws error with missing status', () => {
      const object = { ...serviceObject, status: undefined }
      expect(() => parseServiceInfo(object)).toThrowError('ServiceInfo: status is not provided')
    })

    it('throws error with missing provider', () => {
      const object = { ...serviceObject, proposal: undefined }
      expect(() => parseServiceInfo(object)).toThrowError('ServiceInfo: proposal is not provided')
    })

    it('throws error with missing options', () => {
      const object = { ...serviceObject, options: undefined }
      expect(() => parseServiceInfo(object)).toThrowError('ServiceInfo: options is not provided')
    })
  })
})
