/*
 * Copyright (C) 2018 The "mysteriumnetwork/js-tequilapi" Authors.
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

export interface AxiosError {
  message: string,
  response?: { status: number },
  code?: string
}

export default class TequilapiError extends Error {
  public name: string = 'TequilapiError'

  public _originalError: AxiosError

  constructor (originalError: Error, path: string) {
    super(`${originalError.message} (path="${path}")`)

    this._originalError = originalError
  }

  get code (): string | undefined {
    return this._originalError.code
  }

  get isTimeoutError (): boolean {
    return this.code === errorCodes.CONNECTION_ABORTED_ERROR_CODE
  }

  get isRequestClosedError (): boolean {
    return this._hasHttpStatus(httpResponseCodes.CLIENT_CLOSED_REQUEST)
  }

  get isServiceUnavailableError (): boolean {
    return this._hasHttpStatus(httpResponseCodes.SERVICE_UNAVAILABLE)
  }

  get isNotFoundError (): boolean {
    return this._hasHttpStatus(httpResponseCodes.NOT_FOUND)
  }

  public _hasHttpStatus (expectedStatus: number): boolean {
    if (!this._originalError.response) {
      return false
    }
    return this._originalError.response.status === expectedStatus
  }
}

const httpResponseCodes = {
  CLIENT_CLOSED_REQUEST: 499,
  SERVICE_UNAVAILABLE: 503,
  NOT_FOUND: 404
}

const errorCodes = {
  CONNECTION_ABORTED_ERROR_CODE: 'ECONNABORTED'
}
