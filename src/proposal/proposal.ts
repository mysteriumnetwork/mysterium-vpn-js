/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validate, validateMultiple } from '../fmt/validation'
import { Quality } from './quality'
import { AccessPolicyRef } from '../access-policy/access-policy'
import { ServiceLocation } from './service-location'
import { Price } from './price'

export interface Proposal {
  format: string
  compatibility: number
  providerId: string
  serviceType: string
  location: ServiceLocation
  price: Price
  quality?: Quality
  accessPolicies?: AccessPolicyRef[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseProposal(data: any): Proposal {
  validateMultiple('Proposal', data, [
    { name: 'format', type: 'string' },
    { name: 'compatibility', type: 'number' },
    { name: 'providerId', type: 'string' },
    { name: 'serviceType', type: 'string' },
    { name: 'location', type: 'object' },
    { name: 'price', type: 'object' },
  ])

  return data
}

export interface ProposalQuery {
  presetId?: number
  providerId?: string
  from?: string
  serviceType?: string
  locationCountry?: string
  accessPolicy?: string
  accessPolicySource?: string
  ipType?: string
  priceGibMax?: number
  priceHourMax?: number
  compatibilityMin?: number
  compatibilityMax?: number
  qualityMin?: number
  includeMonitoringFailed?: boolean
}

interface ProposalList {
  proposals: Proposal[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseProposalList(responseData: any): ProposalList {
  validate('ProposalList', responseData, { name: 'proposals', type: 'array' })
  return { proposals: responseData.proposals.map(parseProposal) }
}
