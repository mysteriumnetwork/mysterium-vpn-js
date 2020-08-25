/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { parseSession, parseSessionList } from './session'

describe('TequilapiClient DTO', () => {
  const sessionData = {
    id: 'id1',
    direction: 'Provided',
    consumerId: '0x1',
    hermesId: '0x2',
    providerId: '0x3',
    serviceType: 'openvpn',
    providerCountry: 'MU',
    createdAt: '2019-01-01',
    duration: 59,
    bytesSent: 10,
    bytesReceived: 11,
    tokens: 4_000,
    status: 'New',
  }

  describe('.parseSession', () => {
    const sessionObject = parseSession(sessionData)

    it('sets properties', async () => {
      expect(sessionObject.id).toEqual('id1')
      expect(sessionObject.consumerId).toEqual('0x1')
    })

    it('throws error with null data', () => {
      expect(() => parseSession(null)).toThrowError()
    })

    it('throws error with missing id', () => {
      const object = { ...sessionData, id: undefined }
      expect(() => parseSession(object)).toThrowError('Session: id is not provided')
    })

    it('throws error with missing consumerId', () => {
      const object = { ...sessionData, consumerId: undefined }
      expect(() => parseSession(object)).toThrowError('Session: consumerId is not provided')
    })
  })

  describe('.parseSessionList', () => {
    it('sets properties with full structure', async () => {
      const sessions = parseSessionList({
        sessions: [sessionData],
      })

      expect(sessions).toHaveLength(1)
      expect(sessions[0].id).toEqual('id1')
      expect(sessions[0].consumerId).toEqual('0x1')
    })

    it('throws error when invoked with an empty object', async () => {
      expect(() => {
        parseSessionList({})
      }).toThrowError('Session[]: sessions is not provided')
    })

    it('throws an error if proposal in array does not validate', async () => {
      expect(() => {
        parseSessionList({
          sessions: [{}],
        })
      }).toThrowError('Session: id is not provided')
    })
  })
})
