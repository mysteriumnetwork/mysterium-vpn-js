/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TequilapiClient } from '../tequilapi-client'
import { ServiceSession } from '../provider/service-session'
import { FunctionLooper } from '../func/function-looper'
import { Publisher } from '../func/publisher'

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

  private processSessionCount(sessions: ServiceSession[]): void {
    if (sessions.length !== this.countLast) {
      this.countPublisher.publish(sessions.length)
    }

    this.countLast = sessions.length
  }
}
