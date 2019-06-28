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

import { parseServiceSession, parseServiceSessionList } from './service-session'

describe('TequilapiClient DTO', () => {
  const sessionData = {
    id: 'id1',
    consumerId: '0x1',
    createdAt: '2019-01-01',
    bytesIn: 10,
    bytesOut: 11,
  }

  describe('.parseServiceInfo', () => {
    const sessionObject = parseServiceSession(sessionData)

    it('sets properties', async () => {
      expect(sessionObject.id).toEqual('id1')
      expect(sessionObject.consumerId).toEqual('0x1')
    })

    it('throws error with null data', () => {
      expect(() => parseServiceSession(null)).toThrowError()
    })

    it('throws error with missing id', () => {
      const object = { ...sessionData, id: undefined }
      expect(() => parseServiceSession(object)).toThrowError('ServiceSession: id is not provided')
    })

    it('throws error with missing consumerId', () => {
      const object = { ...sessionData, consumerId: undefined }
      expect(() => parseServiceSession(object)).toThrowError(
        'ServiceSession: consumerId is not provided'
      )
    })
  })

  describe('.parseServiceSessionList', () => {
    it('sets properties with full structure', async () => {
      const sessions = parseServiceSessionList({
        sessions: [sessionData],
      })

      expect(sessions).toHaveLength(1)
      expect(sessions[0].id).toEqual('id1')
      expect(sessions[0].consumerId).toEqual('0x1')
    })

    it('throws error when invoked with an empty object', async () => {
      expect(() => {
        parseServiceSessionList({})
      }).toThrowError('ServiceSession[]: sessions is not provided')
    })

    it('throws an error if proposal in array does not validate', async () => {
      expect(() => {
        parseServiceSessionList({
          sessions: [{}],
        })
      }).toThrowError('ServiceSession: id is not provided')
    })
  })
})
