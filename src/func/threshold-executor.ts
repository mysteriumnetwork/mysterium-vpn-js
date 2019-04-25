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

// Internal type for capturing duration and error of function
import { sleep } from './utils'

interface ExecutionResult {
  error?: Error,
  duration: number
}

/**
 * Executes given function and sleeps for remaining time.
 * If .cancel() is invoked, than sleep is skipped after function finishes.
 */
export class ThresholdExecutor {
  private canceled: boolean

  constructor (
    private func: () => Promise<any>,
    private threshold: number,
    private errorCallback?: (err: Error) => any) {
    this.canceled = false
  }

  /**
   * Executes given function and sleeps for remaining time, if .cancel() was not invoked.
   * @returns {Promise<void>}
   */
  public async execute (): Promise<void> {
    const executionResult = await this.executeFunction()
    if (executionResult.error && this.errorCallback) {
      this.errorCallback(executionResult.error)
    }
    await this.sleepRemainingTime(executionResult.duration)
  }

  /**
   * Forces currently function execution to skip sleep.
   */
  public cancel () {
    this.canceled = true
  }

  private async executeFunction (): Promise<ExecutionResult> {
    const start = Date.now()
    let error = null
    try {
      await this.func()
    } catch (err) {
      error = err
    }
    const end = Date.now()
    return { duration: end - start, error }
  }

  private async sleepRemainingTime (duration: number): Promise<void> {
    const sleepTime = this._remainingSleepTime(duration)
    if (sleepTime > 0) {
      await sleep(sleepTime)
    }
  }

  private _remainingSleepTime (duration: number): number {
    if (this.canceled || duration >= this.threshold) {
      return 0
    }
    return this.threshold - duration
  }
}
