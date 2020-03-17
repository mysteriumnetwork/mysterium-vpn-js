/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Internal type for capturing duration and error of function
import { sleep } from './sleep'

interface ExecutionResult {
  error?: Error
  duration: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExecutorFn = () => Promise<any>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ErrorCallback = (err: Error) => any

/**
 * Executes given function and sleeps for remaining time.
 * If .cancel() is invoked, than sleep is skipped after function finishes.
 */
export class ThresholdExecutor {
  private canceled: boolean
  private readonly func: ExecutorFn
  private readonly threshold: number
  private readonly errorCallback?: ErrorCallback

  public constructor(func: ExecutorFn, threshold: number, errorCallback?: ErrorCallback) {
    this.func = func
    this.threshold = threshold
    this.errorCallback = errorCallback
    this.canceled = false
  }

  /**
   * Executes given function and sleeps for remaining time, if .cancel() was not invoked.
   * @returns {Promise<void>}
   */
  public async execute(): Promise<void> {
    const executionResult = await this.executeFunction()
    if (executionResult.error && this.errorCallback) {
      this.errorCallback(executionResult.error)
    }
    await this.sleepRemainingTime(executionResult.duration)
  }

  /**
   * Forces currently function execution to skip sleep.
   */
  public cancel(): void {
    this.canceled = true
  }

  private async executeFunction(): Promise<ExecutionResult> {
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

  private async sleepRemainingTime(duration: number): Promise<void> {
    const sleepTime = this._remainingSleepTime(duration)
    if (sleepTime > 0) {
      await sleep(sleepTime)
    }
  }

  private _remainingSleepTime(duration: number): number {
    if (this.canceled || duration >= this.threshold) {
      return 0
    }
    return this.threshold - duration
  }
}
