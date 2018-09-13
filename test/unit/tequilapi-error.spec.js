/*
 * Copyright (C) 2018 The "mysteriumnetwork/mysterium-vpn" Authors.
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

// @flow

import TequilapiError from '../../src/tequilapi-error'
import type { AxiosError } from '../../src/tequilapi-error'

function createTequilapiErrorWithCode (code: string): TequilapiError {
  const error = new Error('test error')
  const axiosError = (error: AxiosError)
  axiosError.code = code
  return new TequilapiError(error, 'test-path')
}

function createTequilapiErrorWithResponseStatus (status: number): TequilapiError {
  const error = new Error('test error')
  const axiosError = (error: AxiosError)
  axiosError.response = { status }
  return new TequilapiError(error, 'test-path')
}

describe('TequilapiError', () => {
  const simpleError = new Error('test error')
  const simpleTequilapiError = new TequilapiError(simpleError, 'test-path')

  it('is instance of TequilapiError', () => {
    // seems like redundant spec, but it's valuable, because this doesn't work by default:
    // "babel-plugin-transform-builtin-extend" plugin was used to make this work
    expect(simpleTequilapiError).to.be.instanceOf(TequilapiError)
  })

  it('is instance of Error', () => {
    expect(simpleTequilapiError).to.be.instanceOf(Error)
  })

  describe('.name', () => {
    it('returns TequilapiError', () => {
      expect(simpleTequilapiError.name).to.eql('TequilapiError')
    })
  })

  describe('.message', () => {
    it('returns extended message', () => {
      expect(simpleTequilapiError.message).to.eql('test error (path="test-path")')
    })
  })

  describe('.code', () => {
    it('returns undefined for simple error', () => {
      expect(simpleTequilapiError.code).to.be.undefined
    })

    it('returns code of original error for error with code', () => {
      const tequilapiError = createTequilapiErrorWithCode('SOME CODE')
      expect(tequilapiError.code).to.eql('SOME CODE')
    })
  })

  describe('.isTimeoutError', () => {
    it('returns false for simple error', () => {
      expect(simpleTequilapiError.isTimeoutError).to.be.false
    })

    it('returns true for errors with timeout code', () => {
      const tequilapiError = createTequilapiErrorWithCode('ECONNABORTED')
      expect(tequilapiError.isTimeoutError).to.be.true
    })
  })

  describe('.isRequestClosedError', () => {
    it('returns false for simple error', () => {
      expect(simpleTequilapiError.isRequestClosedError).to.be.false
    })

    it('returns true for errors with request closed status', () => {
      const tequilapiError = createTequilapiErrorWithResponseStatus(499)
      expect(tequilapiError.isRequestClosedError).to.be.true
    })
  })

  describe('.isServiceUnavailableError', () => {
    it('returns false for simple error', () => {
      expect(simpleTequilapiError.isServiceUnavailableError).to.be.false
    })

    it('returns true for errors with request closed status', () => {
      const tequilapiError = createTequilapiErrorWithResponseStatus(503)
      expect(tequilapiError.isServiceUnavailableError).to.be.true
    })
  })

  describe('.toString', () => {
    it('returns error message with class name', () => {
      expect(simpleTequilapiError.toString()).to.eql('TequilapiError: test error (path="test-path")')
    })
  })
})
