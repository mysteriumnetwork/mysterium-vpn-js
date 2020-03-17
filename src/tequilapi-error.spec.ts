/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AxiosError, TequilapiError } from './tequilapi-error'

function createTequilapiErrorWithCode(code: string): TequilapiError {
  const error = new Error('test error')
  const axiosError = error as AxiosError
  axiosError.code = code
  return new TequilapiError(error, 'test-path')
}

function createTequilapiErrorWithResponseStatus(status: number): TequilapiError {
  const error = new Error('test error')
  const axiosError = error as AxiosError
  axiosError.response = { status }
  return new TequilapiError(error, 'test-path')
}

describe('TequilapiError', () => {
  const simpleError = new Error('test error')
  const simpleTequilapiError = new TequilapiError(simpleError, 'test-path')

  it('is instance of TequilapiError', () => {
    // seems like redundant spec, but it's valuable, because this doesn't work by default
    expect(simpleTequilapiError).toBeInstanceOf(TequilapiError)
  })

  it('is instance of Error', () => {
    expect(simpleTequilapiError).toBeInstanceOf(Error)
  })

  describe('.name', () => {
    it('returns TequilapiError', () => {
      expect(simpleTequilapiError.name).toEqual('TequilapiError')
    })
  })

  describe('.message', () => {
    it('returns extended message', () => {
      expect(simpleTequilapiError.message).toEqual('test error (path="test-path")')
    })
  })

  describe('.isTequilapiError', () => {
    it('returns true', () => {
      expect(simpleTequilapiError.isTequilapiError).toBe(true)
    })
  })

  describe('.code', () => {
    it('returns undefined for simple error', () => {
      expect(simpleTequilapiError.code).toBeUndefined()
    })

    it('returns code of original error for error with code', () => {
      const tequilapiError = createTequilapiErrorWithCode('SOME CODE')
      expect(tequilapiError.code).toEqual('SOME CODE')
    })
  })

  describe('.isTimeoutError', () => {
    it('returns false for simple error', () => {
      expect(simpleTequilapiError.isTimeoutError).toBe(false)
    })

    it('returns true for errors with timeout code', () => {
      const tequilapiError = createTequilapiErrorWithCode('ECONNABORTED')
      expect(tequilapiError.isTimeoutError).toBe(true)
    })
  })

  describe('.isRequestClosedError', () => {
    it('returns false for simple error', () => {
      expect(simpleTequilapiError.isRequestClosedError).toBe(false)
    })

    it('returns true for errors with request closed status', () => {
      const tequilapiError = createTequilapiErrorWithResponseStatus(499)
      expect(tequilapiError.isRequestClosedError).toBe(true)
    })
  })

  describe('.isServiceUnavailableError', () => {
    it('returns false for simple error', () => {
      expect(simpleTequilapiError.isServiceUnavailableError).toBe(false)
    })

    it('returns true for errors with request closed status', () => {
      const tequilapiError = createTequilapiErrorWithResponseStatus(503)
      expect(tequilapiError.isServiceUnavailableError).toBe(true)
    })
  })

  describe('.isNotFoundError', () => {
    it('returns false for simple error', () => {
      expect(simpleTequilapiError.isNotFoundError).toBe(false)
    })

    it('returns true for errors with request closed status', () => {
      const tequilapiError = createTequilapiErrorWithResponseStatus(404)
      expect(tequilapiError.isNotFoundError).toBe(true)
    })
  })

  describe('.isUnauthorizedError', () => {
    it('returns false for simple error', () => {
      expect(simpleTequilapiError.isNotFoundError).toBe(false)
    })

    it('returns true for errors with request closed status', () => {
      const tequilapiError = createTequilapiErrorWithResponseStatus(401)
      expect(tequilapiError.isUnauthorizedError).toBe(true)
    })
  })

  describe('.toString', () => {
    it('returns error message with class name', () => {
      expect(simpleTequilapiError.toString()).toEqual(
        'TequilapiError: test error (path="test-path")'
      )
    })
  })
})
