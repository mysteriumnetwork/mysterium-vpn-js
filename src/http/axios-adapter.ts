/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AxiosInstance } from 'axios'
import { TequilapiError } from '../tequilapi-error'
import { TIMEOUT_DEFAULT } from './timeouts'
import { HttpInterface, HttpQuery } from './interface'

async function decorateResponse(promise: Promise<any>, path: string): Promise<any> {
  let response
  try {
    response = await promise
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const responseMsg = err.response?.data?.message
    if (responseMsg) {
      throw new TequilapiError(Error(responseMsg), path)
    }
    throw new TequilapiError(err, path)
  }
  return response.data
}

export class AxiosAdapter implements HttpInterface {
  public _axios: AxiosInstance
  public _timeout: number

  public constructor(axiosInstance: AxiosInstance, defaultTimeout: number = TIMEOUT_DEFAULT) {
    this._axios = axiosInstance
    this._timeout = defaultTimeout
  }

  public setHeaders(headers: any): void {
    this._axios.defaults.headers.common = headers
  }

  public setAuthHeader(token: string): void {
    this._axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  }

  public get(path: string, query?: HttpQuery, timeout?: number): Promise<any> {
    const options = this._decorateOptions(timeout)
    options.params = query

    return decorateResponse(this._axios.get(path, options), path)
  }

  public getFile(path: string, query?: HttpQuery, timeout?: number): Promise<any> {
    const options = this._decorateOptions(timeout)
    options.responseType = 'arraybuffer'
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
