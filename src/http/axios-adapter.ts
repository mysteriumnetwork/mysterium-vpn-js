/*
 * Copyright (C) 2017 The "mysteriumnetwork/mysterium-vpn-js" Authors.
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
import TequilapiError from '../tequilapi-error'
import { TIMEOUT_DEFAULT } from './timeouts'
import { HttpInterface, HttpQueryParams } from './interface'

async function decorateResponse(promise: Promise<any>, path: string): Promise<any> {
  let response
  try {
    response = await promise
  } catch (err) {
    throw new TequilapiError(err, path)
  }
  return response.data
}

export default class AxiosAdapter implements HttpInterface {
  public _axios: AxiosInstance
  public _timeout: number

  public constructor(axiosInstance: AxiosInstance, defaultTimeout: number = TIMEOUT_DEFAULT) {
    this._axios = axiosInstance
    this._timeout = defaultTimeout
  }

  public get(path: string, query?: HttpQueryParams, timeout?: number): Promise<any> {
    const options = this._decorateOptions(timeout)
    options.params = query

    return decorateResponse(this._axios.get(path, options), path)
  }

  public post(path: string, data: any, timeout?: number): Promise<any> {
    return decorateResponse(this._axios.post(path, data, this._decorateOptions(timeout)), path)
  }

  public delete(path: string, timeout?: number): Promise<any> {
    return decorateResponse(this._axios.delete(path, this._decorateOptions(timeout)), path)
  }

  public put(path: string, data: any, timeout?: number): Promise<any> {
    return decorateResponse(this._axios.put(path, data, this._decorateOptions(timeout)), path)
  }

  public _decorateOptions(timeout?: number): any {
    return {
      timeout: timeout !== undefined ? timeout : this._timeout,
    }
  }
}
