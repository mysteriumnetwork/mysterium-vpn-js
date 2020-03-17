/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
