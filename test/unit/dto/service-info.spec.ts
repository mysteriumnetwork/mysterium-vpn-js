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

import { parseServiceInfoDTO } from '../../../src/dto/service-info'
import { ServiceStatus } from '../../../src/dto/service-status'

describe('TequilapiClient DTO', () => {
  describe('.parseServiceInfoDTO', () => {
    const proposalObject = {
      id: 1,
      providerId: '0x1',
      serviceType: 'openvpn',
      serviceDefinition: {}
    }
    const serviceObject = parseServiceInfoDTO({
      id: 'service1',
      status: 'Running',
      proposal: proposalObject,
      options: { foo: 'bar' }
    })

    it('sets properties', async () => {
      expect(serviceObject.id).toEqual('service1')
      expect(serviceObject.status).toEqual(ServiceStatus.RUNNING)
      expect(serviceObject.proposal).toEqual(proposalObject)
      expect(serviceObject.options).toEqual({ foo: 'bar' })
    })

    it('throws error with null data', () => {
      expect(() => parseServiceInfoDTO(null)).toThrowError()
    })

    it('throws error with missing id', () => {
      const object = { ...serviceObject, id: undefined }
      expect(() => parseServiceInfoDTO(object)).toThrowError('ServiceInfoDTO: id is not provided')
    })

    it('throws error with missing status', () => {
      const object = { ...serviceObject, status: undefined }
      expect(() => parseServiceInfoDTO(object)).toThrowError('ServiceInfoDTO: status is not provided')
    })

    it('throws error with missing provider', () => {
      const object = { ...serviceObject, proposal: undefined }
      expect(() => parseServiceInfoDTO(object)).toThrowError('ServiceInfoDTO: proposal is not provided')
    })

    it('throws error with missing options', () => {
      const object = { ...serviceObject, options: undefined }
      expect(() => parseServiceInfoDTO(object)).toThrowError('ServiceInfoDTO: options is not provided')
    })
  })
})
