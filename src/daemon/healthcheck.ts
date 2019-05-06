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

import { validateMultiple } from '../fmt/validation'

export interface NodeBuildInfo {
  commit: string
  branch: string
  buildNumber: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseNodeBuildInfo(data: any): NodeBuildInfo {
  validateMultiple('NodeBuildInfo', data, [
    { name: 'commit', type: 'string' },
    { name: 'branch', type: 'string' },
    { name: 'buildNumber', type: 'string' },
  ])
  return data
}

export interface NodeHealthcheck {
  uptime: string
  process: number
  version: string
  buildInfo: NodeBuildInfo
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseHealthcheckResponse(data: any): NodeHealthcheck {
  const errorMessage = `Unable to parse healthcheck response: ${JSON.stringify(data)}`
  if (data == null || typeof data !== 'object') {
    throw new Error(errorMessage)
  }

  if (typeof data.uptime !== 'string') {
    throw new Error(errorMessage)
  }

  if (typeof data.process !== 'number') {
    throw new Error(errorMessage)
  }

  if (typeof data.version !== 'string') {
    throw new Error(errorMessage)
  }

  if (data.buildInfo === null || typeof data.buildInfo !== 'object') {
    throw new Error(errorMessage)
  }
  const buildInfo: NodeBuildInfo = parseNodeBuildInfo(data.buildInfo)

  return { ...data, buildInfo }
}
