/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validate } from '../fmt/validation'
import { Proposal } from '../proposal/proposal'
import { ConnectionStatistics } from './statistics'

export enum ConnectionStatus {
  CONNECTED = 'Connected',
  NOT_CONNECTED = 'NotConnected',
  DISCONNECTING = 'Disconnecting',
  CONNECTING = 'Connecting',
  ON_HOLD = 'OnHold',
}

export interface ConnectionInfo {
  status: ConnectionStatus
  consumerId?: string
  hermesId?: string
  proposal?: Proposal
  sessionId?: string
}

export type Connection = ConnectionInfo & {
  statistics: ConnectionStatistics
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseConnectionInfo(data: any): ConnectionInfo {
  // TODO: validate that status has value from ConnectionStatus enum
  validate('ConnectionInfo', data, { name: 'status', type: 'string' })
  return data
}
