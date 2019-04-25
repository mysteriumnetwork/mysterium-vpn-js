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
