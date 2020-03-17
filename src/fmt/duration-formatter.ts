/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const timeDisplayDefault = '--:--:--'

export class DurationFormatter {
  /**
   * @function
   * @param {number} seconds
   * @returns {string} readable in --:--:-- format
   * @throws {Error} if argument is null
   */
  public format(seconds: number): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof (seconds as any) !== 'number' || seconds < 0) {
      throw new Error('invalid input')
    }

    const h = this.formatTwoDigitNumber(Math.floor(seconds / 3600))
    const m = this.formatTwoDigitNumber(Math.floor((seconds % 3600) / 60))
    const s = this.formatTwoDigitNumber(seconds % 60)
    return `${h}:${m}:${s}`
  }

  public formatOrDefault(seconds: number): string {
    try {
      return this.format(seconds)
    } catch (err) {
      return timeDisplayDefault
    }
  }

  private formatTwoDigitNumber(value: number): string {
    return value > 9 ? value.toString() : `0${value}`
  }
}
