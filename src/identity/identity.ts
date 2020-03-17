/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validate } from '../fmt/validation'

export interface Identity {
  id: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseIdentity(data: any): Identity {
  validate('Identity', data, { name: 'id', type: 'string' })
  return data
}

export interface IdentityList {
  identities: Identity[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseIdentityList(responseData: any): IdentityList {
  if (!(responseData && Array.isArray(responseData.identities))) {
    return { identities: [] }
  }

  return { identities: responseData.identities.map(parseIdentity) }
}
