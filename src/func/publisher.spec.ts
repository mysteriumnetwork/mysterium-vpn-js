/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Publisher } from './publisher'

describe('Publisher', () => {
  let publisher: Publisher<string>
  beforeEach(() => {
    publisher = new Publisher()
  })

  it('publishes each event', () => {
    const values: string[] = []
    publisher.addSubscriber((value: string) => {
      values.push(value)
    })

    publisher.publish('hello')
    publisher.publish('world')

    expect(values).toEqual(['hello', 'world'])
  })

  it('publishes event to multiple subscribers', () => {
    let value1 = null
    let value2 = null
    publisher.addSubscriber((value: string) => {
      value1 = value
    })
    publisher.addSubscriber((value: string) => {
      value2 = value
    })

    publisher.publish('hey')

    expect(value1).toEqual('hey')
    expect(value2).toEqual('hey')
  })

  it('publishes event to all subscribers when first is failing', () => {
    let value1 = null
    let value2 = null
    publisher.addSubscriber((value: string) => {
      value1 = value
      throw new Error('mock error')
    })
    publisher.addSubscriber((value: string) => {
      value2 = value
    })

    publisher.publish('hey')

    expect(value1).toEqual('hey')
    expect(value2).toEqual('hey')
  })

  it('returns function which unsubscribes', () => {
    const values: string[] = []
    const unsubscribe = publisher.addSubscriber((value: string) => {
      values.push(value)
    })

    publisher.publish('hello')
    unsubscribe()
    publisher.publish('world')

    expect(values).toEqual(['hello'])
  })

  describe('.removeSubscriber', () => {
    it('returns error if unsubscribing twice', () => {
      const cb = () => {
        // empty
      }
      publisher.addSubscriber(cb)
      publisher.removeSubscriber(cb)
      expect(() => publisher.removeSubscriber(cb)).toThrowError(
        'Callback being unsubscribed was not found'
      )
    })
  })
})
