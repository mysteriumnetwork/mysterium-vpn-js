/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validateMultiple } from '../fmt/validation'

export interface Pageable {
  items: any[]
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export function parsePageable(data: any): Pageable {
  validateMultiple('Pageable', data, [
    { name: 'items', type: 'array' },
    { name: 'page', type: 'number' },
    { name: 'pageSize', type: 'number' },
    { name: 'totalItems', type: 'number' },
    { name: 'totalPages', type: 'number' },
  ])
  return data
}
