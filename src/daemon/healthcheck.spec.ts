/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { parseHealthcheckResponse } from './healthcheck'

describe('TequilapiClient DTO', () => {
  describe('.parseHealthcheckResponse', () => {
    it('sets properties', async () => {
      const status = parseHealthcheckResponse({
        uptime: '1h10m',
        process: 1111,
        version: '0.0.6',
        buildInfo: {
          commit: 'my commit',
          branch: 'my branch',
          buildNumber: 'my build number',
        },
      })

      expect(status.uptime).toEqual('1h10m')
      expect(status.process).toEqual(1111)
      expect(status.version).toEqual('0.0.6')
      expect(status.buildInfo).toEqual({
        commit: 'my commit',
        branch: 'my branch',
        buildNumber: 'my build number',
      })
    })

    it('throws error with empty data', async () => {
      expect(() => parseHealthcheckResponse({})).toThrowError(
        'Unable to parse healthcheck response: {}'
      )
    })

    it('throws error with wrong data', async () => {
      expect(() => parseHealthcheckResponse('I am wrong')).toThrowError(
        'Unable to parse healthcheck response: "I am wrong"'
      )
    })
  })
})
