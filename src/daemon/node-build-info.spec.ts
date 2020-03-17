/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { parseNodeBuildInfo } from './healthcheck'

describe('TequilapiClient DTO', () => {
  describe('.parseNodeBuildInfo', () => {
    const data = {
      commit: '0bcccc',
      branch: 'master',
      buildNumber: '001',
    }

    it('sets properties', async () => {
      const version = parseNodeBuildInfo(data)

      expect(version.commit).toEqual('0bcccc')
      expect(version.branch).toEqual('master')
      expect(version.buildNumber).toEqual('001')
    })

    it('throws without required properties', async () => {
      expect(() => parseNodeBuildInfo({ ...data, ...{ commit: undefined } })).toThrow()
      expect(() => parseNodeBuildInfo({ ...data, ...{ branch: undefined } })).toThrow()
      expect(() => parseNodeBuildInfo({ ...data, ...{ buildNumber: undefined } })).toThrow()
    })
  })
})
