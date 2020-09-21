/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface AxiosError {
  message: string
  response?: {
    status: number
    data?: any
  }
  code?: string
}

const errorCodes = {
  CONNECTION_ABORTED_ERROR_CODE: 'ECONNABORTED',
}

const httpResponseCodes = {
  CLIENT_CLOSED_REQUEST: 499,
  SERVICE_UNAVAILABLE: 503,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
}

export class TequilapiError extends Error {
  public name = 'TequilapiError'

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
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
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

  public get isUnauthorizedError(): boolean {
    return this._hasHttpStatus(httpResponseCodes.UNAUTHORIZED)
  }

  public get originalResponseData(): any | undefined {
    return this._originalError.response?.data
  }

  public _hasHttpStatus(expectedStatus: number): boolean {
    if (!this._originalError.response) {
      return false
    }
    return this._originalError.response.status === expectedStatus
  }
}
