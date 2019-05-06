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
  return {
    status: data.status,
    sessionId: data.sessionId,
  }
}
