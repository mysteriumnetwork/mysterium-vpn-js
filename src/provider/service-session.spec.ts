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

import { parseServiceSessionDTO, parseServiceSessionListDTO } from './service-session'

describe('TequilapiClient DTO', () => {
  const sessionData = {
    id: 'id1',
    consumerId: '0x1',
  }

  describe('.parseServiceInfoDTO', () => {
    const sessionObject = parseServiceSessionDTO(sessionData)

    it('sets properties', async () => {
      expect(sessionObject.id).toEqual('id1')
      expect(sessionObject.consumerId).toEqual('0x1')
    })

    it('throws error with null data', () => {
      expect(() => parseServiceSessionDTO(null)).toThrowError()
    })

    it('throws error with missing id', () => {
      const object = { ...sessionData, id: undefined }
      expect(() => parseServiceSessionDTO(object)).toThrowError(
        'ServiceSessionDTO: id is not provided'
      )
    })

    it('throws error with missing consumerId', () => {
      const object = { ...sessionData, consumerId: undefined }
      expect(() => parseServiceSessionDTO(object)).toThrowError(
        'ServiceSessionDTO: consumerId is not provided'
      )
    })
  })

  describe('.parseServiceSessionListDTO', () => {
    it('sets properties with full structure', async () => {
      const sessions = parseServiceSessionListDTO({
        sessions: [sessionData],
      })

      expect(sessions).toHaveLength(1)
      expect(sessions[0].id).toEqual('id1')
      expect(sessions[0].consumerId).toEqual('0x1')
    })

    it('throws error when invoked with an empty object', async () => {
      expect(() => {
        parseServiceSessionListDTO({})
      }).toThrowError('ServiceSessionDTO[]: sessions is not provided')
    })

    it('throws an error if proposal in array does not validate', async () => {
      expect(() => {
        parseServiceSessionListDTO({
          sessions: [{}],
        })
      }).toThrowError('ServiceSessionDTO: id is not provided')
    })
  })
})
