/*
 * Copyright (C) 2019 The "mysteriumnetwork/mysterium-vpn-js" Authors.
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

import { validate, validateMultiple } from '../fmt/validation'

export interface AccessRule {
  type: string
  value?: string
}

export interface AccessPolicy {
  id: string
  title: string
  description: string
  allow: AccessRule[]
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
