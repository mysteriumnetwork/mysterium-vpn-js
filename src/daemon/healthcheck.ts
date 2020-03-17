/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
