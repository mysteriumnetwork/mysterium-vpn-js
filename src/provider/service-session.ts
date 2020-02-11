/*
 * Copyright (C) 2019 The "mysteriumnetwork/mysterium-vpn-js" Authors.
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

export interface ServiceSession {
  id: string
  consumerId: string
  createdAt: string
  bytesIn: number
  bytesOut: number
  tokensEarned: number
}

export function parseServiceSession(data: any): ServiceSession {
  validateMultiple('ServiceSession', data, [
    { name: 'id', type: 'string' },
    { name: 'consumerId', type: 'string' },
    { name: 'createdAt', type: 'string' },
    { name: 'bytesIn', type: 'number' },
    { name: 'bytesOut', type: 'number' },
    { name: 'tokensEarned', type: 'number' },
  ])
  return data
}

export function parseServiceSessionList(responseData: any): ServiceSession[] {
  validate('ServiceSession[]', responseData, { name: 'sessions', type: 'array' })
  return responseData.sessions.map(parseServiceSession)
}
