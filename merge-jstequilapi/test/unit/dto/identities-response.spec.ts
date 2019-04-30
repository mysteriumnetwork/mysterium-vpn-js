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

import { parseIdentitiesResponseDTO } from '../../../src/dto/identities-response'

describe('TequilapiClient DTO', () => {
  describe('.parseIdentitiesResponseDTO', () => {
    it('sets properties', async () => {
      const response = parseIdentitiesResponseDTO({
        identities: [
          { id: '0x1000FACE' },
          { id: '0x2000FACE' }
        ]
      })

      expect(response.identities).toHaveLength(2)
      expect(response.identities[0].id).toEqual('0x1000FACE')
      expect(response.identities[1].id).toEqual('0x2000FACE')
    })

    it('returns empty array when properties are empty', async () => {
      const response = parseIdentitiesResponseDTO({})

      expect(response.identities).toEqual([])
    })

    it('returns empty array when properties are wrong', async () => {
      const response = parseIdentitiesResponseDTO('I am wrong')

      expect(response.identities).toEqual([])
    })
  })
})
