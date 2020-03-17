/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { validate } from '../fmt/validation'

export enum ConnectionStatus {
  CONNECTED = 'Connected',
  NOT_CONNECTED = 'NotConnected',
  DISCONNECTING = 'Disconnecting',
  CONNECTING = 'Connecting',
}

export interface ConnectionStatusResponse {
  status: ConnectionStatus
  sessionId?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseConnectionStatusResponse(data: any): ConnectionStatusResponse {
  // TODO: validate that status has value from ConnectionStatus enum
  validate('ConnectionStatusResponse', data, { name: 'status', type: 'string' })
  return data
}
