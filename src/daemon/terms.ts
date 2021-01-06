/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface Terms {
  // example: false
  agreedProvider: boolean
  // example: false
  agreedConsumer: boolean
  // example: 0.0.27
  agreedVersion: string
  // example: 0.0.27
  currentVersion: string
}

export interface TermsRequest {
  // example: false
  agreedProvider?: boolean
  // example: false
  agreedConsumer?: boolean
  // example: 0.0.27
  agreedVersion?: string
}
