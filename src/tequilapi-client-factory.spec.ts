/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AxiosInstance } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { TequilapiClientFactory } from './tequilapi-client-factory'

describe('TequilapiClientFactory', () => {
  let axios: AxiosInstance
  let mock: MockAdapter

  beforeEach(() => {
    const clientFactory = new TequilapiClientFactory()
    axios = clientFactory.axiosInstance()
    mock = new MockAdapter(axios)
  })

  describe('axiosInstance', () => {
    it('converts request params to snake_case', async () => {
      // eslint-disable-next-line @typescript-eslint/camelcase
      mock.onGet('/anything', { params: { snake_case: 1 } }).reply(202)

      const res = await axios.get('/anything', {
        params: {
          snakeCase: 1,
        },
      })
      expect(res.status).toEqual(202)
    })
    it('converts request body to snake_case', async () => {
      // eslint-disable-next-line @typescript-eslint/camelcase
      mock.onPost('/anything', { snake_body: 1 }).reply(202)

      const res = await axios.post('/anything', {
        snakeBody: 1,
      })
      expect(res.status).toEqual(202)
    })
    it('converts response body to camelCase', async () => {
      // eslint-disable-next-line @typescript-eslint/camelcase
      mock.onGet('/anything').reply(200, {
        // eslint-disable-next-line @typescript-eslint/camelcase
        snake_response: 3,
      })

      const res = await axios.get('/anything')
      expect(res.data.snakeResponse).toEqual(3)
    })
  })
})
