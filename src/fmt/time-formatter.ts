/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

class TimeFormatter {
  private readonly minutesOffset: number

  public constructor(minutesOffset: number) {
    this.minutesOffset = minutesOffset
  }

  public formatDate(date: Date): string {
    const newDate = this.getDateWithOffset(date)
    const year = newDate.getUTCFullYear()
    const month = this.formatTwoDigitNumber(newDate.getUTCMonth() + 1)
    const day = this.formatTwoDigitNumber(newDate.getUTCDate())
    return `${day}/${month}/${year}`
  }

  public formatTime(date: Date): string {
    const newDate = this.getDateWithOffset(date)
    const hours = this.formatTwoDigitNumber(newDate.getUTCHours())
    const minutes = this.formatTwoDigitNumber(newDate.getUTCMinutes())
    const seconds = this.formatTwoDigitNumber(newDate.getUTCSeconds())
    return `${hours}:${minutes}:${seconds}`
  }

  public formatISODateTime(date: Date): string {
    return date.toISOString()
  }

  public getCurrentISODateTime(): string {
    return this.formatISODateTime(new Date())
  }

  private getDateWithOffset(date: Date): Date {
    const newDate = new Date(date.getTime())
    newDate.setMinutes(newDate.getMinutes() - this.minutesOffset)
    return newDate
  }

  private formatTwoDigitNumber(value: number): string {
    return value > 9 ? value.toString() : `0${value}`
  }
}

export { TimeFormatter }
