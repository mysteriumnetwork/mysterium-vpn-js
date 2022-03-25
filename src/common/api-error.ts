/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const CONTENT_TYPE_ERR_V1 = 'application/vnd.mysterium.error+json'

export class APIError extends Error {
  response: APIErrorResponse
  constructor(originalErr: APIErrorResponse) {
    super(originalErr.error.message)
    Object.setPrototypeOf(this, APIError.prototype)
    this.response = originalErr
  }
  human(): string {
    return this.response.error.detail ?? this.response.error.message
  }
}

export interface APIErrorResponse {
  error: Err
  status: number
  path: string
}

export interface Err {
  code: string
  message: string
  detail?: string
  fields?: {
    [key: string]: FieldError
  }
}

export interface FieldError {
  error: string
  message: string
}
