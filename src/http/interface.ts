/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface HttpQuery {
  [s: string]: any
}

export interface HttpInterface {
  setHeaders(headers: any): void
  setAuthHeader(token: string): void
  get(path: string, query?: HttpQuery, timeout?: number): Promise<any>
  post(path: string, data?: any, timeout?: number): Promise<any>
  delete(path: string, timeout?: number): Promise<any>
  put(path: string, data: any, timeout?: number): Promise<any>
}
