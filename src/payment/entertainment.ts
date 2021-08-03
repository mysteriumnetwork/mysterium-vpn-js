/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface EntertainmentEstimateQuery {
  amount: number
}

export interface EntertainmentEstimateResponse {
  videoMinutes: number
  browsingMinutes: number
  musicMinutes: number
  trafficMb: number
}
