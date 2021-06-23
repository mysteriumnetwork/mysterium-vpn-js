/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Pageable } from '../common/pageable'

export interface FilterPreset {
  id: number
  name: string
}

export type FilterPresetsResponse = Pageable<FilterPreset>
