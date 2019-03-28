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

import { TequilapiClient } from 'mysterium-tequilapi/lib/client'
import { ServiceSessionDTO } from 'mysterium-tequilapi/lib/dto/service-session'
import { FunctionLooper } from './looper/function-looper'
import { Publisher } from './publisher'

export class ProviderSessions {
  private fetcher: FunctionLooper

  private countPublisher: Publisher<number> = new Publisher()
  private countLast?: number

  constructor (private tequilapiClient: TequilapiClient) {
    this.fetcher = new FunctionLooper(async () => this.fetch(), 1000)
  }

  public onCount (callback: (count: number) => any) {
    this.countPublisher.addSubscriber(callback)
    this.fetcher.start()
  }

  private async fetch () {
    const sessions = await this.tequilapiClient.serviceSessions()
    this.processSessionCount(sessions)
  }

  private processSessionCount (sessions: ServiceSessionDTO[]) {
    if (sessions.length !== this.countLast) {
      this.countPublisher.publish(sessions.length)
    }

    this.countLast = sessions.length
  }
}
