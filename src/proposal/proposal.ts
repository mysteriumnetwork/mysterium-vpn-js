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

import { validate, validateMultiple } from '../fmt/validation'
import { Metrics } from '../metric/metrics'
import { ServiceDefinition } from '../provider/service-definition'
import { PaymentMethod } from '../payment/method'

export interface AccessPolicyRef {
  id: string
  source: string
}

export interface Proposal {
  id: number
  providerId: string
  serviceType: string
  serviceDefinition: ServiceDefinition
  metrics?: Metrics
  accessPolicies?: AccessPolicyRef[]
  paymentMethod?: PaymentMethod
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseProposal(data: any): Proposal {
  validateMultiple('Proposal', data, [
    { name: 'id', type: 'number' },
    { name: 'providerId', type: 'string' },
    { name: 'serviceType', type: 'string' },
    { name: 'serviceDefinition', type: 'object' },
  ])

  return data
}

export interface ProposalQuery {
  providerId?: string
  serviceType?: string
  accessPolicyProtocol?: string
  accessPolicyId?: string
  fetchConnectCounts?: boolean
}

interface ProposalList {
  proposals: Proposal[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseProposalList(responseData: any): ProposalList {
  validate('ProposalList', responseData, { name: 'proposals', type: 'array' })
  return { proposals: responseData.proposals.map(parseProposal) }
}
