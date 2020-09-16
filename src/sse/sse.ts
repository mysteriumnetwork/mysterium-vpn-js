/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ConnectionStatus } from '../connection/status'
import { ConnectionStatistics } from '../connection/statistics'
import { Proposal } from '../proposal/proposal'
import { Identity } from '../identity/identity'
import { NatStatusResponse } from '../nat/status'
import { ServiceInfo } from '../provider/service-info'
import camelcaseKeys from 'camelcase-keys'
import { Session, SessionStats } from '../session/session'

export const TEQUILAPI_SSE_URL = 'http://127.0.0.1:4050/events/state'

export interface AppState {
  natStatus: NatStatusResponse
  serviceInfo?: ServiceInfo[]
  sessions?: Session[]
  sessionsStats?: SessionStats
  consumer?: {
    connection?: {
      status: ConnectionStatus
      statistics?: ConnectionStatistics
      proposal?: Proposal
    }
  }
  identities?: Identity[]
}

export enum SSEEventType {
  AppStateChange = 'state-change',
}

export interface SSEResponse {
  type: SSEEventType
  payload: AppState
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseSSEResponse = (data: any): SSEResponse => {
  const { type, payload } = camelcaseKeys(typeof data === 'string' ? JSON.parse(data) : data, {
    deep: true,
  })
  return { type, payload }
}
