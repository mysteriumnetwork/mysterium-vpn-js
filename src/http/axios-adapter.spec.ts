/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import MockAdapter from 'axios-mock-adapter'
import { AxiosAdapter } from './axios-adapter'
import { APIError } from '../common/api-error'
import { TequilapiClientFactory } from '../tequilapi-client-factory'

describe('TequilapiClient AxiosAdapter', () => {
  let adapter: AxiosAdapter
  let mock: MockAdapter
  beforeEach(() => {
    const axioInstance = new TequilapiClientFactory().axiosInstance()
    adapter = new AxiosAdapter(axioInstance, 1)
    mock = new MockAdapter(axioInstance)
  })

  it('handles get response', async () => {
    const responseExpected = { foo: 'bar' }
    mock.onGet('test-url').reply(200, responseExpected)

    const response = await adapter.get('test-url')
    expect(response).toEqual(responseExpected)
  })

  it('handles post response', async () => {
    const requestExpected = { param: 'value' }
    const responseExpected = { foo: 'bar' }
    mock.onPost('test-url', requestExpected).reply(200, responseExpected)

    const response = await adapter.post('test-url', requestExpected)
    expect(response).toEqual(responseExpected)
  })

  it('handles put response', async () => {
    const requestExpected = { param: 'value' }
    const responseExpected = { foo: 'bar' }
    mock.onPut('test-url', requestExpected).reply(200, responseExpected)

    const response = await adapter.put('test-url', requestExpected)
    expect(response).toEqual(responseExpected)
  })

  it('handles delete response', async () => {
    const responseExpected = { foo: 'bar' }
    mock.onDelete('test-url').reply(200, responseExpected)

    const response = await adapter.delete('test-url')
    expect(response).toEqual(responseExpected)
  })

  it('returns network error', () => {
    mock.onGet('test-url').networkError()

    expect(adapter.get('test-url')).rejects.toBeInstanceOf(APIError)
  })

  it('returns timeout error', () => {
    mock.onGet('test-url').timeout()

    expect(adapter.get('test-url')).rejects.toHaveProperty(
      'message',
      'timeout of 1ms exceeded (path="test-url")'
    )
  })

  it('returns 404 response error', () => {
    mock.onGet('test-url').reply(404, { message: 'What is wrong' })

    expect(adapter.get('test-url')).rejects.toHaveProperty('message', '{"message":"What is wrong"}')
  })

  it('saves headers', () => {
    const key = 'HeaderExample'
    const value = 'HeaderValue'
    adapter.setHeaders({ [key]: value })

    expect(adapter._axios.defaults.headers.common[key]).toEqual(value)
  })

  it('saves auth token', () => {
    const token = 'token'
    adapter.setAuthHeader(token)

    expect(adapter._axios.defaults.headers.common['Authorization']).toEqual('Bearer ' + token)
  })
})
