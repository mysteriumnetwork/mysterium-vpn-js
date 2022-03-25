/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import snakecaseKeys from 'snakecase-keys'
import { TIMEOUT_DEFAULT } from './http/timeouts'
import { HttpInterface } from './http/interface'
import axios, { AxiosInstance } from 'axios'
import { AxiosAdapter } from './http/axios-adapter'
import {
  pathConfig,
  pathConfigDefault,
  pathConfigUser,
  pathInvoice,
  TEQUILAPI_URL,
  TequilapiClient,
} from './tequilapi-client'
import { camelcaseKeys } from './util/camelcaseKeys'
import { axiosErrorHandler } from './http/axios-api-error'

export class TequilapiClientFactory {
  public _baseUrl: string
  public _defaultTimeout: number

  public constructor(baseUrl: string = TEQUILAPI_URL, defaultTimeout: number = TIMEOUT_DEFAULT) {
    this._baseUrl = baseUrl
    this._defaultTimeout = defaultTimeout
  }

  public build(adapter?: HttpInterface): TequilapiClient {
    if (!adapter) {
      adapter = this.buildAdapter()
    }
    return new TequilapiClient(adapter)
  }

  private static isRawPath(path: string): boolean {
    const rawPaths = [pathConfig, pathConfigDefault, pathConfigUser, pathInvoice]
    for (const rawPath of rawPaths) {
      if (path.includes(rawPath)) {
        return true
      }
    }
    return false
  }
  public axiosInstance(): AxiosInstance {
    const ax = axios.create({
      baseURL: this._baseUrl,
      headers: {
        'Cache-Control': 'no-cache, no-store',
      },
    })
    const convertOptions = {
      deep: true,
    }

    ax.interceptors.request.use((config) => {
      if (config.url && TequilapiClientFactory.isRawPath(config.url)) {
        return config
      }
      if (config.params) {
        config.params = snakecaseKeys(config.params, convertOptions)
      }
      if (config.data) {
        config.data = snakecaseKeys(config.data, convertOptions)
      }
      return config
    })
    ax.interceptors.response.use((response) => {
      if (response.config.url && TequilapiClientFactory.isRawPath(response.config.url)) {
        return response
      }
      if (response.data) {
        response.data = camelcaseKeys(response.data)
      }
      return response
    }, axiosErrorHandler)
    return ax
  }

  public buildAdapter(axiosInstance?: AxiosInstance): HttpInterface {
    if (!axiosInstance) {
      axiosInstance = this.axiosInstance()
    }
    return new AxiosAdapter(axiosInstance, this._defaultTimeout)
  }
}

export const tequilapi = new TequilapiClientFactory().build()
