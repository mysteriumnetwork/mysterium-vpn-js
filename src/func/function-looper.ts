/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Publisher } from './publisher'
import { ThresholdExecutor } from './threshold-executor'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LoopFn = () => Promise<any>

export class FunctionLooper {
  private running = false
  private errorPublisher: Publisher<Error> = new Publisher()
  private currentExecutor?: ThresholdExecutor
  private currentPromise?: Promise<void>
  private readonly func: LoopFn
  private readonly threshold: number

  public constructor(func: LoopFn, threshold: number) {
    this.func = func
    this.threshold = threshold
  }

  public start(): void {
    if (this.isRunning()) {
      return
    }
    this.running = true

    const loop = async (): Promise<void> => {
      // eslint-disable-next-line no-unmodified-loop-condition
      while (this.running) {
        this.currentExecutor = new ThresholdExecutor(this.func, this.threshold, (err: Error) => {
          this.reportError(err)
        })
        this.currentPromise = this.currentExecutor.execute()
        await this.currentPromise
      }
    }
    loop().catch((err: Error) => {
      this.reportError(err)
    })
  }

  public async stop(): Promise<void> {
    this.running = false
    await this.waitForStartedPromise()
  }

  public isRunning(): boolean {
    return this.running
  }

  public onFunctionError(callback: (err: Error) => void): void {
    this.errorPublisher.addSubscriber(callback)
  }

  private async waitForStartedPromise(): Promise<void> {
    if (!this.currentExecutor) {
      return
    }
    this.currentExecutor.cancel()
    await this.currentPromise
  }

  private reportError(err: Error): void {
    this.errorPublisher.publish(err)
  }
}
