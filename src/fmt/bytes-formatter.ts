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

import filesize from 'filesize'

export interface BytesReadable {
  amount: string
  units: string
}

interface FilesizeResult {
  value: number
  symbol: string
}

const bytesReadableDefault: BytesReadable = { amount: '-', units: 'KB' }

export class BytesFormatter {
  /**
   * @function
   * @param {number} bytes
   * @returns {{amount:number,units:string}} result - holds amount and units
   * @throws if argument is null
   */
  public format(bytes: number): BytesReadable {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof (bytes as any) !== 'number') {
      throw new Error('provide valid input for conversion')
    }
    const calculated = (filesize(bytes, {
      standard: 'jedec',
      output: 'object',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any) as FilesizeResult
    return {
      amount: calculated.value.toFixed(2),
      units: calculated.symbol.replace('i', ''),
    }
  }

  public formatOrDefault(bytes: number): BytesReadable {
    try {
      return this.format(bytes)
    } catch (err) {
      return bytesReadableDefault
    }
  }
}
