/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validateMultiple } from '../fmt/validation'

export interface Pagination {
  totalItems: number
  totalPages: number
  currentPage: number
  previousPage: number
  nextPage: number
}

export function parsePagination(data: any): Pagination {
  validateMultiple('Pagination', data, [
    { name: 'totalItems', type: 'number' },
    { name: 'totalPages', type: 'number' },
    { name: 'currentPage', type: 'number' },
  ])
  return data
}
