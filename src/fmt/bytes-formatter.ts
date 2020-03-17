/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
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
