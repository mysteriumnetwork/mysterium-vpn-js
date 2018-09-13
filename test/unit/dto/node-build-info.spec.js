/*
 * Copyright (C) 2017 The "mysteriumnetwork/mysterium-vpn" Authors.
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

import NodeBuildInfoDTO from '../../../src/dto/node-build-info'

describe('TequilapiClient DTO', () => {
  describe('NodeBuildInfoDTO', () => {
    it('sets properties', async () => {
      const version = new NodeBuildInfoDTO({
        commit: '0bcccc',
        branch: 'master',
        buildNumber: '001'
      })

      expect(version.commit).to.equal('0bcccc')
      expect(version.branch).to.equal('master')
      expect(version.buildNumber).to.equal('001')
    })

    it('sets empty properties', async () => {
      const version = new NodeBuildInfoDTO({})

      expect(version.commit).to.be.undefined
      expect(version.branch).to.be.undefined
      expect(version.buildNumber).to.be.undefined
    })

    it('sets wrong properties', async () => {
      const version = new NodeBuildInfoDTO('I am wrong')

      expect(version.commit).to.be.undefined
      expect(version.branch).to.be.undefined
      expect(version.buildNumber).to.be.undefined
    })
  })
})
