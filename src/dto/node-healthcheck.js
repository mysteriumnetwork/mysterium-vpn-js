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
import NodeBuildInfoDTO from './node-build-info'

type NodeHealthcheckDTO = {
  uptime: string,
  process: number,
  version: string,
  buildInfo: NodeBuildInfoDTO
}

/**
 * Validates and converts mixed type into NodeHealthcheckDTO.
 * @param data to be conveted
 * @returns converted type
 */
function parseHealthcheckResponse (data: mixed): NodeHealthcheckDTO {
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
  const buildInfo = new NodeBuildInfoDTO(data.buildInfo)

  return { uptime: data.uptime, process: data.process, version: data.version, buildInfo }
}

export type { NodeHealthcheckDTO }
export { parseHealthcheckResponse }
