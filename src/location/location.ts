/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface Location {
  ip: string
  asn: number
  isp: string
  continent: string
  country: string
  city: string
  userType: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseLocation(data: any): Location {
  return data
}
