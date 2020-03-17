/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { parseServiceSession, parseServiceSessionList } from './service-session'

describe('TequilapiClient DTO', () => {
  const sessionData = {
    id: 'id1',
    consumerId: '0x1',
    createdAt: '2019-01-01',
    bytesIn: 10,
    bytesOut: 11,
    tokensEarned: 4_000,
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
