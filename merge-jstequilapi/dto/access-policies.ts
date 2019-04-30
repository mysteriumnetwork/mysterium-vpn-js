/*
 * Copyright (C) 2019 The "mysteriumnetwork/js-tequilapi" Authors.
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

import { validate, validateMultiple } from '../validation'

interface AccessRule {
  type: string,
  value?: string
}

export interface AccessPolicyDTO {
  id: string,
  title: string,
  description: string,
  allow: AccessRule[]
}

function parseAccessRule (responseData: any): AccessRule {
  validateMultiple('AccessRule', responseData, [
    { name: 'type', type: 'string' }
  ])

  if (responseData.value) {
    validate('AccessRule.value', responseData, { name: 'value', type: 'string' })
  }

  return {
    type: responseData.type,
    value: responseData.value
  }
}

export function parseAccessPolicyDTO (responseData: any): AccessPolicyDTO {
  validateMultiple('AccessPolicyDTO', responseData, [
    { name: 'id', type: 'string' },
    { name: 'title', type: 'string' },
    { name: 'description', type: 'string' },
    { name: 'allow', type: 'array' }
  ])

  return {
    id: responseData.id,
    title: responseData.title,
    description: responseData.description,
    allow: responseData.allow.map(parseAccessRule)
  }
}

export function parseAccessPoliciesDTO (responseData: any): AccessPolicyDTO[] {
  validate('AccessPolicyDTO[]', responseData, { name: 'entries', type: 'array' })

  return responseData.entries.map(parseAccessPolicyDTO)
}
