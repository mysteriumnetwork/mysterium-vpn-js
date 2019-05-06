/*
 * Copyright (C) 2019 The "mysteriumnetwork/mysterium-vpn-js" Authors.
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
