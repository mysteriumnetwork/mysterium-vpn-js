/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { parseMetrics } from './metrics'

describe('Metrics', () => {
  describe('.parseMetrics', () => {
    it('returns empty metrics if they are empty', () => {
      const dto = parseMetrics({})
      expect(dto).toEqual({ connectCount: undefined })
    })
  })
})
