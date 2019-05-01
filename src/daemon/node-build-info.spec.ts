/*
 * Copyright (C) 2017 The "mysteriumnetwork/mysterium-vpn-js" Authors.
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

import { parseNodeBuildInfoDTO } from './node-build-info'

describe('TequilapiClient DTO', () => {
  describe('.parseNodeBuildInfoDTO', () => {
    const data = {
      commit: '0bcccc',
      branch: 'master',
      buildNumber: '001',
    }

    it('sets properties', async () => {
      const version = parseNodeBuildInfoDTO(data)

      expect(version.commit).toEqual('0bcccc')
      expect(version.branch).toEqual('master')
      expect(version.buildNumber).toEqual('001')
    })

    it('throws without required properties', async () => {
      expect(() => parseNodeBuildInfoDTO({ ...data, ...{ commit: undefined } })).toThrow()
      expect(() => parseNodeBuildInfoDTO({ ...data, ...{ branch: undefined } })).toThrow()
      expect(() => parseNodeBuildInfoDTO({ ...data, ...{ buildNumber: undefined } })).toThrow()
    })
  })
})
