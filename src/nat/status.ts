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

import { validate } from '../fmt/validation'

export enum NATStatus {
  NOT_FINISHED = 'not_finished',
  FAILED = 'failure',
  SUCCESSFUL = 'successful',
}

export interface NatStatusResponse {
  status: string
  error?: string
}

export function parseNatStatusResponse(data: any): NatStatusResponse {
  validate('NatStatusResponse', data, { name: 'status', type: 'string' })
  if (data.error) {
    validate('NatStatusResponse', data, { name: 'error', type: 'string' })
  }
  return { status: data.status, error: data.error }
}
