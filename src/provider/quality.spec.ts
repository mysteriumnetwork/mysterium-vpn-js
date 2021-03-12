/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { QualityLevel } from './quality'
import { qualityLevel } from './quality'

describe('qualityLevel', () => {
  it('returns quality level according to value', () => {
    expect(qualityLevel({ quality: 0.1 })).toEqual(QualityLevel.LOW)
    expect(qualityLevel({ quality: 1.0 })).toEqual(QualityLevel.MEDIUM)
    expect(qualityLevel({ quality: 1.1 })).toEqual(QualityLevel.MEDIUM)
    expect(qualityLevel({ quality: 2.0 })).toEqual(QualityLevel.HIGH)
    expect(qualityLevel({ quality: 2.1 })).toEqual(QualityLevel.HIGH)
    expect(qualityLevel({ quality: undefined })).toEqual(undefined)
    expect(qualityLevel(undefined)).toEqual(undefined)
  })
})
