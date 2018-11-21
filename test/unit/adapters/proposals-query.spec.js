/*
 * Copyright (C) 2017 The "mysteriumnetwork/mysterium-tequilapi" Authors.
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
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 */

// @flow

import ProposalsQuery from '../../../src/adapters/proposals-query'

describe('ProposalsQuery', () => {
  describe('toQueryParams', () => {
    it('defaults to fetching metrics if nothing was passed to constructor', () => {
      const q = new ProposalsQuery()
      expect(q.toQueryParams()).to.eql({})
    })
    it('returns empty quert Obj if fetchConnectCounts was given false in constructor', () => {
      const q = new ProposalsQuery({ fetchConnectCounts: true })
      expect(q.toQueryParams()).to.eql({ fetchConnectCounts: true })
    })
    it('makes a query object with providerId if given so in constructor', () => {
      const q = new ProposalsQuery({ fetchConnectCounts: true, providerId: 'pID' })
      expect(q.toQueryParams()).to.eql({ fetchConnectCounts: true, providerId: 'pID' })
    })
  })
})
