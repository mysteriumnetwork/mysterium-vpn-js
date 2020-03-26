/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface ConsumerLocation {
  ip?: string
  asn: number
  isp?: string
  continent?: string
  country?: string
  city?: string
  nodeType?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseConsumerLocation(data: any): ConsumerLocation {
  return data
}
