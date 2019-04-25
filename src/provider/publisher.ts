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

import { logger } from '../logger'

type Unsubscribe = () => void

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Subscriber<T> = (value: T) => any

/**
 * Allows subscribing callbacks and publishing data to them.
 */
export class Publisher<T> {
  private subscribers: Subscriber<T>[] = []

  public addSubscriber(subscriber: Subscriber<T>): Unsubscribe {
    this.subscribers.push(subscriber)
    return () => {
      this.removeSubscriber(subscriber)
    }
  }

  public removeSubscriber(subscriber: Subscriber<T>): void {
    const index = this.subscribers.indexOf(subscriber)
    if (index === -1) {
      throw new Error('Callback being unsubscribed was not found')
    }
    this.subscribers.splice(index, 1)
  }

  public publish(data: T): void {
    this.subscribers.forEach((callback: Subscriber<T>) => {
      try {
        callback(data)
      } catch (err) {
        logger.error('Callback call in Publisher failed', err)
      }
    })
  }
}
