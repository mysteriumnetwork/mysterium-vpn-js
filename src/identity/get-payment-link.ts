/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { IdentityProof } from './proof'

export const getPaymentLink = (paymentBaseUrl: string, registration: IdentityProof): string => {
  const { publicKey, signature } = registration
  return (
    paymentBaseUrl +
    `?part1=${publicKey.part1}&part2=${publicKey.part2}` +
    `&r=${signature.r}&s=${signature.s}&v=${signature.v}`
  )
}
