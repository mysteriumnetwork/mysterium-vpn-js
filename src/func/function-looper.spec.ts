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

import lolex, { InstalledClock, NodeClock } from 'lolex'
import { nextTick } from '../test-utils/utils'
import { sleep } from './sleep'
import { FunctionLooper } from './function-looper'

describe('FunctionLooper', () => {
  let clock: InstalledClock<NodeClock>

  beforeAll(() => {
    clock = lolex.install()
  })

  afterAll(() => {
    clock.uninstall()
  })

  async function tickWithDelay(duration: number): Promise<void> {
    clock.tick(duration)
    await nextTick()
  }

  const emptyFunction = async () => {
    // empty
  }

  describe('.start', () => {
    it('executes function multiple times with threshold', async () => {
      let counter = 0
      async function increaseCounter() {
        counter++
      }

      const looper = new FunctionLooper(increaseCounter, 1000)
      expect(counter).toEqual(0)

      looper.start()
      expect(counter).toEqual(1)

      await tickWithDelay(1000)
      expect(counter).toEqual(2)

      await tickWithDelay(2500)
      expect(counter).toEqual(3)

      await tickWithDelay(1000)
      expect(counter).toEqual(4)
    })

    it('does not starts second loop when invoked twice', () => {
      let counter = 0
      async function increaseCounter() {
        counter++
      }

      const looper = new FunctionLooper(increaseCounter, 1000)
      looper.start()
      looper.start()
      expect(counter).toEqual(1)
    })

    it('executes function multiple times when function throws exception', async () => {
      let counter = 0
      async function throwError() {
        counter++
        throw new Error('mock error')
      }

      const looper = new FunctionLooper(throwError, 1000)
      expect(counter).toEqual(0)

      looper.start()
      expect(counter).toEqual(1)

      await tickWithDelay(1000)
      expect(counter).toEqual(2)
    })
  })

  describe('.stop', () => {
    it('stops function execution', async () => {
      let counter = 0
      async function increaseCounter() {
        counter++
      }

      const looper = new FunctionLooper(increaseCounter, 1000)
      looper.start()
      expect(counter).toEqual(1)

      await tickWithDelay(1000)
      expect(counter).toEqual(2)

      looper.stop()

      await tickWithDelay(10000)
      expect(counter).toEqual(2)
    })

    it('waits for the last execution', async () => {
      let counter = 0
      async function increaseCounter() {
        await sleep(400)
        counter++
      }

      const looper = new FunctionLooper(increaseCounter, 1000)
      looper.start()

      let stopped = false
      looper.stop().then(() => {
        stopped = true
      })
      expect(stopped).toEqual(false)
      expect(counter).toEqual(0)

      await tickWithDelay(400)
      expect(stopped).toEqual(true)
      expect(counter).toEqual(1)
    })

    it('does not fail when invoked without starting', async () => {
      const looper = new FunctionLooper(emptyFunction, 1000)
      await looper.stop()
    })
  })

  describe('.isRunning', () => {
    it('returns current looper state', async () => {
      const looper = new FunctionLooper(emptyFunction, 1000)

      expect(looper.isRunning()).toEqual(false)

      looper.start()
      expect(looper.isRunning()).toEqual(true)

      looper.stop()
      await tickWithDelay(1000)
      expect(looper.isRunning()).toEqual(false)
    })
  })

  describe('.onFunctionError', () => {
    it('registers function error handler', async () => {
      const mockError = new Error('mock error')
      let counter = 0
      async function throwError() {
        counter++
        throw mockError
      }

      const looper = new FunctionLooper(throwError, 1000)
      let error = null
      looper.onFunctionError(err => {
        error = err
      })
      expect(counter).toEqual(0)
      expect(error).toBeNull()

      looper.start()
      expect(counter).toEqual(1)
      expect(error).toBeNull()

      await tickWithDelay(1000)
      expect(counter).toEqual(2)
      expect(error).toEqual(mockError)
    })

    it('registers multiple error handlers', async () => {
      const mockError = new Error('mock error')

      async function throwError() {
        throw mockError
      }

      const looper = new FunctionLooper(throwError, 1000)
      let error1 = null
      let error2 = null
      looper.onFunctionError(err => {
        error1 = err
      })
      looper.onFunctionError(err => {
        error2 = err
      })

      expect(error1).toBeNull()
      expect(error2).toBeNull()

      looper.start()
      await tickWithDelay(1000)
      expect(error1).toEqual(mockError)
      expect(error2).toEqual(mockError)
    })
  })
})
