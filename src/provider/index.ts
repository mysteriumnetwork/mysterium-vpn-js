/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { HttpInterface } from '../http/interface'
import { Tokens } from '../common/tokens'

export class ProviderAPI {
  private http: HttpInterface

  constructor(http: HttpInterface) {
    this.http = http
  }

  public async sessions(query: MetricsQuery = { range: '1d' }): Promise<SessionsV2Response> {
    return await this.http.get('/node/provider/sessions', query)
  }

  public async sessionCount(
    query: MetricsQuery = { range: '1d' }
  ): Promise<SessionV2CountResponse> {
    return await this.http.get('/node/provider/sessions-count', query)
  }

  public async transferredDataCount(
    query: MetricsQuery = { range: '1d' }
  ): Promise<SessionV2CountResponse> {
    return await this.http.get('/node/provider/transferred-data', query)
  }

  public async uniqueConsumerCount(
    query: MetricsQuery = { range: '1d' }
  ): Promise<SessionV2CountResponse> {
    return await this.http.get('/node/provider/consumers-count', query)
  }

  public async seriesSessions(query: MetricsQuery = { range: '1d' }): Promise<SeriesResponse> {
    return await this.http.get('/node/provider/series/sessions', query)
  }

  public async seriesEarnings(query: MetricsQuery = { range: '1d' }): Promise<SeriesResponse> {
    return await this.http.get('/node/provider/series/earnings', query)
  }

  public async seriesData(query: MetricsQuery = { range: '1d' }): Promise<SeriesResponse> {
    return await this.http.get('/node/provider/series/data', query)
  }
}

export type MetricsRange = '1d' | '7d' | '30d' | string

export interface MetricsQuery {
  range?: MetricsRange
}

export interface SessionsV2Response {
  sessions: SessionV2[]
}

export interface SessionV2 {
  id: string
  consumerCountry: string
  serviceType: string
  durationSeconds: number
  startedAt: string
  earnings: Tokens
  transferredBytes: number
}

export interface SessionV2CountResponse {
  count: number
}

export interface SeriesEntry {
  value: string
  timestamp: number
}

export interface SeriesResponse {
  data: SeriesEntry[]
}
