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

// @flow

import axios from 'axios'
import AxiosAdapter from './adapters/axios-adapter'
import { TIMEOUT_DEFAULT } from './timeouts'
import HttpTequilapiClient from './client'
import type { TequilapiClient } from './client'
import type { HttpInterface } from './adapters/interface'

const TEQUILAPI_URL = 'http://127.0.0.1:4050'

class TequilapiClientFactory {
  _baseUrl: string
  _defaultTimeout: number

  constructor (baseUrl: string = TEQUILAPI_URL, defaultTimeout: number = TIMEOUT_DEFAULT) {
    this._baseUrl = baseUrl
    this._defaultTimeout = defaultTimeout
  }

  build (): TequilapiClient {
    const adapter = this._buildAdapter()
    return new HttpTequilapiClient(adapter)
  }

  _buildAdapter (): HttpInterface {
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
