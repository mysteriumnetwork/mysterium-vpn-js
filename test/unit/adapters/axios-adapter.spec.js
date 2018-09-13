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

import axios from 'axios/index'
import AxiosAdapter from '../../../src/adapters/axios-adapter'
import MockAdapter from 'axios-mock-adapter'
import { capturePromiseError } from '../../helpers/utils'
import TequilapiError from '../../../src/tequilapi-error'

describe('TequilapiClient AxiosAdapter', () => {
  let adapter
  let mock
  beforeEach(() => {
    const axioInstance = axios.create()
    adapter = new AxiosAdapter(axioInstance, 1)
    mock = new MockAdapter(axioInstance)
  })

  it('handles get response', async () => {
    const responseExpected = { foo: 'bar' }
    mock.onGet('test-url').reply(200, responseExpected)

    const response = await adapter.get('test-url')
    expect(response).to.deep.equal(responseExpected)
  })

  it('handles post response', async () => {
    const requestExpected = { param: 'value' }
    const responseExpected = { foo: 'bar' }
    mock.onPost('test-url', requestExpected).reply(200, responseExpected)

    const response = await adapter.post('test-url', requestExpected)
    expect(response).to.deep.equal(responseExpected)
  })

  it('handles put response', async () => {
    const requestExpected = { param: 'value' }
    const responseExpected = { foo: 'bar' }
    mock.onPut('test-url', requestExpected).reply(200, responseExpected)

    const response = await adapter.put('test-url', requestExpected)
    expect(response).to.deep.equal(responseExpected)
  })

  it('handles delete response', async () => {
    const responseExpected = { foo: 'bar' }
    mock.onDelete('test-url').reply(200, responseExpected)

    const response = await adapter.delete('test-url')
    expect(response).to.deep.equal(responseExpected)
  })

  it('returns network error', async () => {
    mock.onGet('test-url').networkError()

    const err = await capturePromiseError(adapter.get('test-url'))
    expect(err).to.be.instanceOf(TequilapiError)
  })

  it('returns timeout error', async () => {
    mock.onGet('test-url').timeout()

    const err = await capturePromiseError(adapter.get('test-url'))
    expect(err).to.be.instanceOf(TequilapiError)
    expect(err.isTimeoutError).to.be.true
    expect(err.toString()).to.eql('TequilapiError: timeout of 1ms exceeded (path="test-url")')
  })

  it('returns 404 response error', async () => {
    mock.onGet('test-url').reply(404, { message: 'What is wrong' })

    const err = await capturePromiseError(adapter.get('test-url'))
    expect(err).to.be.instanceOf(Error)
    expect(err.message).to.be.equal('Request failed with status code 404 (path="test-url")')
  })
})
