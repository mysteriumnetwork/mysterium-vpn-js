/*
 * Copyright (C) 2017 The "mysteriumnetwork/js-tequilapi" Authors.
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

import axios from 'axios'
import AxiosAdapter from './adapters/axios-adapter'
import { HttpInterface } from './adapters/interface'
import { TequilapiClient } from './client'
import { HttpTequilapiClient } from './http-tequilapi-client'
import { TIMEOUT_DEFAULT } from './timeouts'

const TEQUILAPI_URL: string = 'http://127.0.0.1:4050'

class TequilapiClientFactory {
  public _baseUrl: string
  public _defaultTimeout: number

  constructor (baseUrl: string = TEQUILAPI_URL, defaultTimeout: number = TIMEOUT_DEFAULT) {
    this._baseUrl = baseUrl
    this._defaultTimeout = defaultTimeout
  }

  public build (adapter: HttpInterface): TequilapiClient {
    return new HttpTequilapiClient(adapter)
  }

  public buildAdapter (): HttpInterface {
    const axiosInstance = axios.create({
      baseURL: this._baseUrl,
      headers: {
        'Cache-Control': 'no-cache, no-store'
      }
    })
    return new AxiosAdapter(axiosInstance, this._defaultTimeout)
  }
}

export { TEQUILAPI_URL }
export default TequilapiClientFactory
