/*
 * Copyright (C) 2017 The "mysteriumnetwork/mysterium-vpn" Authors.
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

// @flow

import { validateMultiple } from '../validation'

type ConnectionStatisticsDTO = {
  duration: number,
  bytesReceived: number,
  bytesSent: number
}

function parseConnectionStatisticsDTO (data: Object): ConnectionStatisticsDTO {
  validateMultiple('ConnectionStatisticsDTO', data, [
    { name: 'duration', type: 'number' },
    { name: 'bytesReceived', type: 'number' },
    { name: 'bytesSent', type: 'number' }
  ])

  return {
    duration: data.duration,
    bytesReceived: data.bytesReceived,
    bytesSent: data.bytesSent
  }
}

export type { ConnectionStatisticsDTO }
export { parseConnectionStatisticsDTO }
