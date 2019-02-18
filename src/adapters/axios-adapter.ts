/*
 * Copyright (C) 2019 The "mysteriumnetwork/js-tequilapi" Authors.
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

import { AxiosInstance } from 'axios'
import { HttpInterface, HttpQueryParams } from './interface'
import { TIMEOUT_DEFAULT } from '../timeouts'

// TODO
class AxiosAdapter implements HttpInterface {
  // TODO: check if AxiosInstance is correct
  _axios: AxiosInstance
  _timeout: number

  constructor (axiosInstance: AxiosInstance, defaultTimeout: number = TIMEOUT_DEFAULT) {
    this._axios = axiosInstance
    this._timeout = defaultTimeout
  }

  async get (path: string, query?: HttpQueryParams, timeout?: number): Promise<any> {
  }

  async post (path: string, data: any, timeout?: number): Promise<any> {
  }

  async delete (path: string, timeout?: number): Promise<any> {
  }

  async put (path: string, data: any, timeout?: number): Promise<any> {
  }
}

export default AxiosAdapter
