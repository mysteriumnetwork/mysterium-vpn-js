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

import { Publisher } from '../publisher'
import { ThresholdExecutor } from './threshold-executor'

export class FunctionLooper {
  private running: boolean = false
  private errorPublisher: Publisher<Error> = new Publisher()
  private currentExecutor?: ThresholdExecutor
  private currentPromise?: Promise<void>

  constructor (private func: () => Promise<any>, private threshold: number) {}

  public start (): void {
    if (this.isRunning()) {
      return
    }
    this.running = true

    const loop = async () => {
      // eslint-disable-next-line no-unmodified-loop-condition
      while (this.running) {
        this.currentExecutor = new ThresholdExecutor(
          this.func,
          this.threshold,
          (err: Error) => { this.reportError(err) }
        )
        this.currentPromise = this.currentExecutor.execute()
        await this.currentPromise
      }
    }
    loop().catch((err: Error) => {
      this.reportError(err)
    })
  }

  public async stop (): Promise<void> {
    this.running = false
    await this.waitForStartedPromise()
  }

  public isRunning (): boolean {
    return this.running
  }

  public onFunctionError (callback: (err: Error) => void) {
    this.errorPublisher.addSubscriber(callback)
  }

  private async waitForStartedPromise (): Promise<void> {
    if (!this.currentExecutor) {
      return
    }
    this.currentExecutor.cancel()
    await this.currentPromise
  }

  private reportError (err: Error) {
    this.errorPublisher.publish(err)
  }
}
