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

class TimeFormatter {
  constructor (private readonly minutesOffset: number) {}

  public formatDate (date: Date): string {
    const newDate = this.getDateWithOffset(date)
    const year = newDate.getUTCFullYear()
    const month = this.formatTwoDigitNumber(newDate.getUTCMonth() + 1)
    const day = this.formatTwoDigitNumber(newDate.getUTCDate())
    return `${day}/${month}/${year}`
  }

  public formatTime (date: Date): string {
    const newDate = this.getDateWithOffset(date)
    const hours = this.formatTwoDigitNumber(newDate.getUTCHours())
    const minutes = this.formatTwoDigitNumber(newDate.getUTCMinutes())
    const seconds = this.formatTwoDigitNumber(newDate.getUTCSeconds())
    return `${hours}:${minutes}:${seconds}`
  }

  public formatISODateTime (date: Date): string {
    return date.toISOString()
  }

  public getCurrentISODateTime (): string {
    return this.formatISODateTime(new Date())
  }

  private getDateWithOffset (date: Date): Date {
    const newDate = new Date(date.getTime())
    newDate.setMinutes(newDate.getMinutes() - this.minutesOffset)
    return newDate
  }

  private formatTwoDigitNumber (value: number): string {
    let s = value.toString()
    while (s.length < 2) {
      s = '0' + s
    }
    return s
  }
}

export { TimeFormatter }
