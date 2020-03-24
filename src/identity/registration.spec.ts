/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { parseIdentityRegistration } from './registration'

describe('TequilapiClient DTO', () => {
  describe('.parseIdentityRegistration', () => {
    it('sets properties', () => {
      const identity = parseIdentityRegistration({
        status: 'Promoting',
        registered: false,
      })

      expect(identity.status).toBe('Promoting')
      expect(identity.registered).toBe(false)
    })

    it('sets wrong properties', () => {
      expect(() => parseIdentityRegistration('I am wrong')).toThrow()
    })
  })
})
