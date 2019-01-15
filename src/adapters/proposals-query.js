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
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// @flow
import type { HttpQueryParams } from './interface'
import type { ProposalQueryOptions } from '../dto/query/proposals-query-options'

class ProposalsQuery {
  providerId: ?string
  serviceType: ?string
  fetchConnectCounts: ?boolean

  constructor (options: ?ProposalQueryOptions) {
    if (!options) {
      return
    }

    this.providerId = options.providerId
    this.serviceType = options.serviceType
    this.fetchConnectCounts = options.fetchConnectCounts
  }

  toQueryParams (): ?HttpQueryParams {
    const queryObj = {}
    if (this.providerId) {
      queryObj.providerId = this.providerId
    }
    if (this.serviceType) {
      queryObj.serviceType = this.serviceType
    }
    if (this.fetchConnectCounts) {
      queryObj.fetchConnectCounts = this.fetchConnectCounts
    }
    return queryObj
  }
}

export default ProposalsQuery
