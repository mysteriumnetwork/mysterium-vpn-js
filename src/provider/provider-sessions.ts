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

import { TequilapiClient } from '../tequilapi-client'
import { ServiceSessionDTO } from '../provider'
import { FunctionLooper } from '../func/function-looper'
import { Publisher } from './publisher'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CountSubscriber = (count: number) => any

export class ProviderSessions {
  private fetcher: FunctionLooper

  private countPublisher: Publisher<number> = new Publisher()
  private countLast?: number
  private tequilapiClient: TequilapiClient

  public constructor(tequilapiClient: TequilapiClient) {
    this.tequilapiClient = tequilapiClient
    this.fetcher = new FunctionLooper(async () => this.fetch(), 1000)
  }

  public addCountSubscriber(subscriber: CountSubscriber): void {
    this.countPublisher.addSubscriber(subscriber)
    this.fetcher.start()
  }

  public removeCountSubscriber(subscriber: CountSubscriber): void {
    this.countPublisher.removeSubscriber(subscriber)
  }

  private async fetch(): Promise<void> {
    const sessions = await this.tequilapiClient.serviceSessions()
    this.processSessionCount(sessions)
  }

  private processSessionCount(sessions: ServiceSessionDTO[]): void {
    if (sessions.length !== this.countLast) {
      this.countPublisher.publish(sessions.length)
    }

    this.countLast = sessions.length
  }
}
