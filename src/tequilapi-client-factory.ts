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
import { HttpTequilapiClient, TEQUILAPI_URL, TequilapiClient } from './tequilapi-client'
import camelcaseKeys from 'camelcase-keys'

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
    return new HttpTequilapiClient(adapter)
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
      if (config.params) {
        config.params = snakecaseKeys(config.params, convertOptions)
      }
      if (config.data) {
        config.data = snakecaseKeys(config.data, convertOptions)
      }
      return config
    })
    ax.interceptors.response.use((config) => {
      if (config.data) {
        config.data = camelcaseKeys(config.data, convertOptions)
      }
      return config
    })
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
