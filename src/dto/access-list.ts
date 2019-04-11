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

import { validateArray, validateMultiple } from '../validation'

interface AllowedRule {
  type: string,
  value?: string
}

export interface AccessListDTO {
  id: string,
  title: string,
  description: string,
  allow: AllowedRule[]
}

function parseAllowedRule (responseData: any): AllowedRule {
  validateMultiple('AllowRules', responseData, [
    { name: 'type', type: 'string' }
  ])

  return {
    type: responseData.type,
    value: responseData.value
  }
}

export function parseAccessListItemDTO (responseData: any): AccessListDTO {
  validateMultiple('AccessListItem', responseData, [
    { name: 'id', type: 'string' },
    { name: 'title', type: 'string' },
    { name: 'description', type: 'string' },
    { name: 'allow', type: 'array' }
  ])

  return {
    id: responseData.id,
    title: responseData.title,
    description: responseData.description,
    allow: responseData.allow.map(parseAllowedRule)
  }
}

export function parseAccessListDTO (responseData: any): AccessListDTO[] {
  validateArray('AccessListDTO[]', responseData)

  return responseData.map(parseAccessListItemDTO)
}
