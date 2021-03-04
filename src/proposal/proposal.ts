/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validate, validateMultiple } from '../fmt/validation'
import { Quality } from './quality'
import { ServiceDefinition } from './service-definition'
import { PaymentMethod } from './payment-method'
import { AccessPolicyRef } from '../access-policy/access-policy'

export interface Proposal {
  id: number
  providerId: string
  serviceType: string
  serviceDefinition: ServiceDefinition
  metrics?: Quality
  accessPolicies?: AccessPolicyRef[]
  paymentMethod: PaymentMethod
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseProposal(data: any): Proposal {
  validateMultiple('Proposal', data, [
    { name: 'id', type: 'number' },
    { name: 'providerId', type: 'string' },
    { name: 'serviceType', type: 'string' },
    { name: 'serviceDefinition', type: 'object' },
    { name: 'paymentMethod', type: 'object' },
  ])

  return data
}

export interface ProposalQuery {
  providerId?: string
  serviceType?: string
  accessPolicySource?: string
  accessPolicyId?: string
  fetchMetrics?: boolean
}

interface ProposalList {
  proposals: Proposal[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseProposalList(responseData: any): ProposalList {
  validate('ProposalList', responseData, { name: 'proposals', type: 'array' })
  return { proposals: responseData.proposals.map(parseProposal) }
}
