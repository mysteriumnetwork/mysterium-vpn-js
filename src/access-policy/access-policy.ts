/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validate, validateMultiple } from '../fmt/validation'

export interface AccessPolicyRef {
  id: string
  source: string
}

export interface AccessPolicy {
  id: string
  title: string
  description: string
  allow: AccessRule[]
}

export interface AccessRule {
  type: string
  value?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseAccessRule(responseData: any): AccessRule {
  validateMultiple('AccessRule', responseData, [{ name: 'type', type: 'string' }])
  if (responseData.value) {
    validate('AccessRule.value', responseData, { name: 'value', type: 'string' })
  }
  return responseData
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseAccessPolicy(responseData: any): AccessPolicy {
  validateMultiple('AccessPolicy', responseData, [
    { name: 'id', type: 'string' },
    { name: 'title', type: 'string' },
    { name: 'description', type: 'string' },
    { name: 'allow', type: 'array' },
  ])

  return {
    ...responseData,
    allow: responseData.allow.map(parseAccessRule),
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseAccessPolicyList(responseData: any): AccessPolicy[] {
  validate('AccessPolicy[]', responseData, { name: 'entries', type: 'array' })
  return responseData.entries.map(parseAccessPolicy)
}
