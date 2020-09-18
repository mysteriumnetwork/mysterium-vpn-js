/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { QualityMetricConnects, parseQualityMetricConnects } from './metrics'

describe('.parseQualityMetricConnects', () => {
  it('returns QualityMetricConnects', () => {
    const dto: QualityMetricConnects = parseQualityMetricConnects({
      success: 1,
      fail: 2,
      timeout: 3,
    })
    expect(dto).toBeDefined()
  })

  it('throws error for invalid data', () => {
    expect(() => parseQualityMetricConnects({ success: 1, timeout: 3 })).toThrow(
      'QualityMetricConnects: fail is not provided'
    )
    expect(() => parseQualityMetricConnects({ success: '1', fail: 2, timeout: 3 })).toThrow(
      'QualityMetricConnects: success should be "number"'
    )
  })
})
