/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validateMultiple } from '../fmt/validation'

export interface Pagination {
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export function parsePagination(data: any): Pagination {
  validateMultiple('Pagination', data, [
    { name: 'page', type: 'number' },
    { name: 'pageSize', type: 'number' },
    { name: 'totalItems', type: 'number' },
    { name: 'totalPages', type: 'number' },
  ])
  return data
}
