/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IP {
  ip: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseIP(data: any): IP {
  return data
}
