/*
 * Copyright (C) 2017 The "mysteriumnetwork/mysterium-vpn" Authors.
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

import HttpTequilapiClient from '../../src/client'
import IdentityDTO from '../../src/dto/identity'
import { parseProposalDTO } from '../../src/dto/proposal'
import AxiosAdapter from '../../src/adapters/axios-adapter'
import axios from 'axios/index'
import MockAdapter from 'axios-mock-adapter'
import { capturePromiseError } from '../helpers/utils'
import { parseHealthcheckResponse } from '../../src/dto/node-healthcheck'
import ConnectionStatisticsDTO from '../../src/dto/connection-statistics'
import ConnectionIPDTO from '../../src/dto/connection-ip'
import ConnectionStatusDTO from '../../src/dto/connection-status'
import ConnectionRequestDTO from '../../src/dto/connection-request'
import ConsumerLocationDTO from '../../src/dto/consumer-location'

describe('HttpTequilapiClient', () => {
  let api
  let mock
  beforeEach(() => {
    const axioInstance = axios.create()
    api = new HttpTequilapiClient(new AxiosAdapter(axioInstance))
    mock = new MockAdapter(axioInstance)
  })

  describe('healthcheck()', () => {
    it('returns response', async () => {
      const buildInfo = {
        commit: '0bcccc',
        branch: 'master',
        buildNumber: '001'
      }
      const response = {
        uptime: '1h10m',
        process: 1111,
        version: '0.0.6',
        buildInfo
      }
      mock.onGet('healthcheck').reply(200, response)

      const healthcheck = await api.healthCheck()
      expect(healthcheck).to.deep.equal(parseHealthcheckResponse(response))
      expect(healthcheck.version).to.eql('0.0.6')
      expect(healthcheck.buildInfo).to.eql(buildInfo)
    })

    it('throws error with unexpected response body', async () => {
      const response = {
        uptime: '1h10m',
        process: 1111,
        version: {
          commit: '0bcccc',
          branch: 'master',
          buildNumber: '001'
        }
      }
      mock.onGet('healthcheck').reply(200, response)

      const err = await capturePromiseError(api.healthCheck())
      expect(err).to.be.an('error')
      expect(err.message).to.eql(
        'Unable to parse healthcheck response: ' +
        '{"uptime":"1h10m","process":1111,"version":{"commit":"0bcccc","branch":"master","buildNumber":"001"}}'
      )
    })

    it('handles error', async () => {
      mock.onGet('/healthcheck').reply(500)

      const e = await capturePromiseError(api.healthCheck())
      expect(e.message).to.equal('Request failed with status code 500 (path="healthcheck")')
    })
  })

  describe('stop()', () => {
    it('success', async () => {
      const expectedRequest = undefined
      mock.onPost('stop', expectedRequest).reply(200)

      const response = await api.stop()
      expect(response).to.be.undefined
    })

    it('handles error', async () => {
      mock.onPost('stop').reply(500)

      const e = await capturePromiseError(api.stop())
      expect(e.message).to.equal('Request failed with status code 500 (path="stop")')
    })
  })

  describe('findProposals()', () => {
    it('returns proposal DTOs', async () => {
      const response = {
        proposals: [{
          id: 1,
          providerId: '0x0',
          serviceType: 'openvpn',
          serviceDefinition: {
            locationOriginate: {
              asn: '',
              country: 'NL'
            }
          }
        }, {
          id: 1,
          providerId: '0x1',
          serviceType: 'openvpn',
          serviceDefinition: {
            locationOriginate: {
              asn: '',
              country: 'LT'
            }
          }
        }]
      }
      mock.onGet('proposals').reply(200, response)

      const proposals = await api.findProposals()
      expect(proposals).to.have.lengthOf(2)
      expect(proposals[0]).to.deep.equal(parseProposalDTO(response.proposals[0]))
      expect(proposals[1]).to.deep.equal(parseProposalDTO(response.proposals[1]))
    })

    it('fetches connect counts when option is given', async () => {
      const response = {
        proposals: [{
          id: 1,
          providerId: '0x0',
          serviceType: 'openvpn',
          serviceDefinition: {
            locationOriginate: {
              asn: '',
              country: 'NL'
            }
          },
          metrics: {
            connectCount: {
              success: 1,
              fail: 1,
              ping: 1
            }
          }
        }]
      }
      mock.onGet('proposals', { params: { fetchConnectCounts: true } }).reply(200, response)
      const proposals = await api.findProposals({ fetchConnectCounts: true })
      expect(proposals).to.have.lengthOf(1)
    })

    it('handles error', async () => {
      mock.onGet('proposals').reply(500)

      const e = await capturePromiseError(api.findProposals())
      expect(e.message).to.equal('Request failed with status code 500 (path="proposals")')
    })
  })

  describe('identitiesList()', () => {
    it('returns identity DTOs', async () => {
      const response = {
        identities: [
          { id: '0x1000FACE' },
          { id: '0x2000FACE' }
        ]
      }
      mock.onGet('identities').reply(200, response)

      const identities = await api.identitiesList()
      expect(identities).to.have.lengthOf(2)
      expect(identities[0]).to.deep.equal(new IdentityDTO(response.identities[0]))
      expect(identities[1]).to.deep.equal(new IdentityDTO(response.identities[1]))
    })

    it('handles error', async () => {
      mock.onGet('identities').reply(500)

      const e = await capturePromiseError(api.identitiesList())
      expect(e.message).to.equal('Request failed with status code 500 (path="identities")')
    })
  })

  describe('identityCreate()', () => {
    it('create identity', async () => {
      const response = { id: '0x0000bEEF' }
      mock.onPost('identities', { passphrase: 'test' }).reply(200, response)

      const identity = await api.identityCreate('test')
      expect(identity).to.deep.equal(new IdentityDTO(response))
    })

    it('handles error', async () => {
      mock.onPost('identities').reply(500)

      const e = await capturePromiseError(api.identityCreate('test'))
      expect(e.message).to.equal('Request failed with status code 500 (path="identities")')
    })
  })

  describe('identityUnlock()', () => {
    it('create identity', async () => {
      mock.onPut('identities/0x0000bEEF/unlock', { passphrase: 'test' }).reply(200)

      const identity = await api.identityUnlock('0x0000bEEF', 'test')
      expect(identity).to.be.undefined
    })

    it('handles error', async () => {
      mock.onPut('identities/0x0000bEEF/unlock').reply(500)

      const e = await capturePromiseError(api.identityUnlock('0x0000bEEF', 'test'))
      expect(e.message).to.equal('Request failed with status code 500 (path="identities/0x0000bEEF/unlock")')
    })
  })

  describe('identityRegistration()', () => {
    it('returns response', async () => {
      const response = {
        registered: false,
        publicKey: {
          part1: '0xfb22c62ed2ddc65eb2994a8af5b1094b239aacc04a6505fd2bc581f55547175a',
          part2: '0xef3156a0d95c3832b191c03c272a5900e3e30484b9c8a65a0387f1f8d436867f'
        },
        signature: {
          r: '0xb48616d33aba008f687d500cac9e9f2ca2b3c275fab6fc21318b81e09571d993',
          s: '0x49c0d7e1445389dbc805275f0aeb0b7f23e50e26a772b5a3bc4b2cc39f1bb3aa',
          v: 28
        }
      }
      mock.onGet('identities/0x0000bEEF/registration').reply(200, response)

      const registration = await api.identityRegistration('0x0000bEEF')
      expect(registration).to.be.deep.equal(response)
    })

    it('handles error', async () => {
      mock.onGet('identities/0x0000bEEF/registration').reply(500)

      const e = await capturePromiseError(api.identityRegistration('0x0000bEEF'))
      expect(e.message).to.equal('Request failed with status code 500 (path="identities/0x0000bEEF/registration")')
    })
  })

  describe('connectionCreate()', () => {
    it('returns response', async () => {
      const expectedRequest = {
        consumerId: '0x1000FACE',
        providerId: '0x2000FACE'
      }
      const response = {
        status: 'Connected',
        sessionId: 'My-super-session'
      }
      mock.onPut('connection', expectedRequest).reply(200, response)

      const stats = await api.connectionCreate(new ConnectionRequestDTO('0x1000FACE', '0x2000FACE'))
      expect(stats).to.deep.equal(new ConnectionStatusDTO(response))
    })

    it('handles error', async () => {
      mock.onPut('connection').reply(500)

      const e = await capturePromiseError(api.connectionCreate(new ConnectionRequestDTO()))
      expect(e.message).to.equal('Request failed with status code 500 (path="connection")')
    })
  })

  describe('connectionStatus()', () => {
    it('returns response', async () => {
      const response = {
        status: 'Connected',
        sessionId: 'My-super-session'
      }
      mock.onGet('connection').reply(200, response)

      const connection = await api.connectionStatus()
      expect(connection).to.deep.equal(new ConnectionStatusDTO(response))
    })

    it('handles error', async () => {
      mock.onGet('connection').reply(500)

      const e = await capturePromiseError(api.connectionStatus())
      expect(e.message).to.equal('Request failed with status code 500 (path="connection")')
    })
  })

  describe('connectionCancel()', () => {
    it('succeeds', async () => {
      const expectedRequest = undefined
      mock.onDelete('connection', expectedRequest).reply(200)

      await api.connectionCancel()
    })

    it('handles error', async () => {
      mock.onDelete('connection').reply(500)

      const e = await capturePromiseError(api.connectionCancel())
      expect(e.message).to.equal('Request failed with status code 500 (path="connection")')
    })
  })

  describe('connectionIP()', () => {
    it('returns response', async () => {
      const response = { ip: 'mock ip' }
      mock.onGet('connection/ip').reply(200, response)

      const stats = await api.connectionIP()
      expect(stats).to.deep.equal(new ConnectionIPDTO(response))
    })

    it('handles error', async () => {
      mock.onGet('connection/ip').reply(500)

      const e = await capturePromiseError(api.connectionIP())
      expect(e.message).to.equal('Request failed with status code 500 (path="connection/ip")')
    })
  })

  describe('connectionStatistics()', () => {
    it('returns response', async () => {
      const response = {
        duration: 13325,
        bytesReceived: 1232133, // 1.17505 MB
        bytesSent: 123321 // 0.117608 MB
      }
      mock.onGet('connection/statistics').reply(200, response)

      const stats = await api.connectionStatistics()
      expect(stats).to.deep.equal(new ConnectionStatisticsDTO(response))
    })

    it('handles error', async () => {
      mock.onGet('connection/statistics').reply(500)

      const e = await capturePromiseError(api.connectionStatistics())
      expect(e.message).to.equal('Request failed with status code 500 (path="connection/statistics")')
    })
  })

  describe('location()', () => {
    it('returns response', async () => {
      const response = {
        original: { ip: '100.100.100.100', country: 'original country' },
        current: { ip: '123.123.123.123', country: 'current country' }
      }
      mock.onGet('location').reply(200, response)

      const stats = await api.location()

      const dto = new ConsumerLocationDTO(response)
      expect(stats.originalCountry).to.equal(dto.originalCountry)
      expect(stats.originalIP).to.equal(dto.originalIP)
      expect(stats.currentCountry).to.equal(dto.currentCountry)
      expect(stats.currentIP).to.equal(dto.currentIP)
      expect(stats).to.deep.equal(dto)
    })

    it('handles error', async () => {
      mock.onGet('location').reply(500)

      const e = await capturePromiseError(api.location())
      expect(e.message).to.equal('Request failed with status code 500 (path="location")')
    })
  })
})
