/*
 * Copyright (C) 2018 The "mysteriumnetwork/mysterium-vpn" Authors.
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

import { validateMultiple } from '../fmt/validation'

export interface ConnectionSessionDTO {
  sessionId: string
  providerId: string
  providerCountry: string
  dateStarted: string
  bytesSent: number
  bytesReceived: number
  duration: number
}

export function validateSession(data: any): ConnectionSessionDTO {
  validateMultiple('ConnectionSessionDTO', data, [
    { name: 'sessionId', type: 'string' },
    { name: 'providerId', type: 'string' },
    { name: 'providerCountry', type: 'string' },
    { name: 'dateStarted', type: 'string' },
    { name: 'bytesSent', type: 'number' },
    { name: 'bytesReceived', type: 'number' },
    { name: 'duration', type: 'number' },
  ])
  return data
}
