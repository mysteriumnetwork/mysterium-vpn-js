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

import { ConnectCountDTO, parseConnectionCountDTO  } from '../../../src/dto/connect-count-dto'

describe('.parseConnectionCountDTO', () => {
  it('returns ConnectionCountDTO', () => {
    const dto: ConnectCountDTO = parseConnectionCountDTO({ success: 1, fail: 2, timeout: 3 })
    expect(dto).toBeDefined()
  })

  it('throws error for invalid data', () => {
    expect(() => parseConnectionCountDTO({ success: 1, timeout: 3 }))
      .toThrow('ConnectCountDTO: fail is not provided')
    expect(() => parseConnectionCountDTO({ success: '1', fail: 2, timeout: 3 }))
      .toThrow('ConnectCountDTO: success should be "number"')
  })
})
