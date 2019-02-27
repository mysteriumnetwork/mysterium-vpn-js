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

export class DurationFormatter {
  /**
   * @function
   * @param {number} seconds
   * @returns {string} readable in --:--:-- format
   * @throws {Error} if argument is null
   */
  public format (seconds: number): string {
    if (typeof (seconds as any) !== 'number' || seconds < 0) {
      throw new Error('invalid input')
    }

    const h = this.formatTwoDigitNumber(Math.floor(seconds / 3600))
    const m = this.formatTwoDigitNumber(Math.floor((seconds % 3600) / 60))
    const s = this.formatTwoDigitNumber(seconds % 60)
    return `${h}:${m}:${s}`
  }

  public formatOrDefault (seconds: number): string {
    try {
      return this.format(seconds)
    } catch (err) {
      return timeDisplayDefault
    }
  }

  private formatTwoDigitNumber (value: number): string {
    return value > 9 ? value.toString() : `0${value}`
  }
}

const timeDisplayDefault = '--:--:--'
