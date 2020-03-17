/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export class Logger {
  public error(message: string, error?: Error): void {
    if (error) {
      // tslint:disable-next-line no-console
      console.error(message, error)
    } else {
      // tslint:disable-next-line no-console
      console.error(message)
    }
  }
}

const logger = new Logger()
export { logger }
