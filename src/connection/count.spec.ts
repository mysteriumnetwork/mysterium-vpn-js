/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ConnectionCount, parseConnectionCount } from './count'

describe('.parseConnectionCount', () => {
  it('returns ConnectionCountDTO', () => {
    const dto: ConnectionCount = parseConnectionCount({ success: 1, fail: 2, timeout: 3 })
    expect(dto).toBeDefined()
  })

  it('throws error for invalid data', () => {
    expect(() => parseConnectionCount({ success: 1, timeout: 3 })).toThrow(
      'ConnectCount: fail is not provided'
    )
    expect(() => parseConnectionCount({ success: '1', fail: 2, timeout: 3 })).toThrow(
      'ConnectCount: success should be "number"'
    )
  })
})
