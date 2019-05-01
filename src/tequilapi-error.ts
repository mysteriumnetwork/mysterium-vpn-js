/*
 * Copyright (C) 2018 The "mysteriumnetwork/mysterium-vpn-js" Authors.
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
  message: string
  response?: { status: number }
  code?: string
}

const errorCodes = {
  CONNECTION_ABORTED_ERROR_CODE: 'ECONNABORTED',
}

const httpResponseCodes = {
  CLIENT_CLOSED_REQUEST: 499,
  SERVICE_UNAVAILABLE: 503,
  NOT_FOUND: 404,
}

export default class TequilapiError extends Error {
  public name: string = 'TequilapiError'

  public _originalError: AxiosError

  public constructor(originalError: Error, path: string) {
    super(`${originalError.message} (path="${path}")`)

    /**
     * Javascript's built-in class Error breaks the prototype chain by switching the object to be constructed (i.e. this) to a new,
     * different object, when you call super and that new object doesn't have the expected prototype chain,
     * i.e. it's an instance of Error not of CustomError.
     * This problem can be elegantly solved using 'new.target', which is supported since Typescript 2.2:
     * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
     * https://stackoverflow.com/a/48342359
     */
    const actualProto = new.target.prototype
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto)
    } else {
      // @ts-ignore
      this.__proto__ = actualProto
    }

    this._originalError = originalError
  }

  public get isTequilapiError(): boolean {
    return true
  }

  public get code(): string | undefined {
    return this._originalError.code
  }

  public get isTimeoutError(): boolean {
    return this.code === errorCodes.CONNECTION_ABORTED_ERROR_CODE
  }

  public get isRequestClosedError(): boolean {
    return this._hasHttpStatus(httpResponseCodes.CLIENT_CLOSED_REQUEST)
  }

  public get isServiceUnavailableError(): boolean {
    return this._hasHttpStatus(httpResponseCodes.SERVICE_UNAVAILABLE)
  }

  public get isNotFoundError(): boolean {
    return this._hasHttpStatus(httpResponseCodes.NOT_FOUND)
  }

  public _hasHttpStatus(expectedStatus: number): boolean {
    if (!this._originalError.response) {
      return false
    }
    return this._originalError.response.status === expectedStatus
  }
}
