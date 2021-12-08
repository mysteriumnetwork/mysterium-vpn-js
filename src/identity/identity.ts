/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validate, validateMultiple } from '../fmt/validation'

export interface IdentityRef {
  id: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseIdentityRef(data: any): IdentityRef {
  validate('IdentityRef', data, { name: 'id', type: 'string' })
  return data
}

export interface IdentityList {
  identities: IdentityRef[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseIdentityList(responseData: any): IdentityList {
  if (!(responseData && Array.isArray(responseData.identities))) {
    return { identities: [] }
  }

  return { identities: responseData.identities.map(parseIdentityRef) }
}

export enum IdentityRegistrationStatus {
  Unknown = 'Unknown',
  Unregistered = 'Unregistered',
  InProgress = 'InProgress',
  Registered = 'Registered',
  RegistrationError = 'RegistrationError',
}

export interface Identity {
  id: string
  registrationStatus: IdentityRegistrationStatus
  channelAddress: string
  balance: number
  earnings: number
  earningsTotal: number
  stake: number
  hermesId: string
}

export interface IdentityBalanceResponse {
  balance: number
}

export function parseIdentity(data: any): Identity {
  validateMultiple('Identity', data, [
    { name: 'id', type: 'string' },
    { name: 'registrationStatus', type: 'string' },
    { name: 'channelAddress', type: 'string' },
    { name: 'balance', type: 'number' },
    { name: 'earnings', type: 'number' },
    { name: 'earningsTotal', type: 'number' },
    { name: 'stake', type: 'number' },
  ])
  return data
}
