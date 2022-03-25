/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AxiosInstance } from 'axios'
import { TIMEOUT_DEFAULT } from './timeouts'
import { HttpInterface, HttpQuery } from './interface'

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

    return this._axios.get(path, options).then((res) => res.data)
  }

  public getFile(path: string, query?: HttpQuery, timeout?: number): Promise<any> {
    const options = this._decorateOptions(timeout)
    options.responseType = 'arraybuffer'
    return this._axios.get(path, options).then((res) => res.data)
  }

  public post(path: string, data: any, timeout?: number): Promise<any> {
    return this._axios.post(path, data, this._decorateOptions(timeout)).then((res) => res.data)
  }

  public delete(path: string, timeout?: number): Promise<any> {
    return this._axios.delete(path, this._decorateOptions(timeout)).then((res) => res.data)
  }

  public put(path: string, data: any, timeout?: number): Promise<any> {
    return this._axios.put(path, data, this._decorateOptions(timeout)).then((res) => res.data)
  }

  public _decorateOptions(timeout?: number): any {
    return {
      timeout: timeout !== undefined ? timeout : this._timeout,
    }
  }
}
