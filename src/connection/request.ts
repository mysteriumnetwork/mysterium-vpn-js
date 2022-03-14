/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface ConnectionRequest {
  consumerId: string
  providerId: string
  hermesId?: string
  serviceType: string
  connectOptions?: ConnectOptions
}

export interface ConnectOptions {
  disableKillSwitch?: boolean
  dns?: DNSOption
  proxyPort?: number
}

export type DNSOption = 'auto' | 'provider' | 'system' | string

export interface ConnectionCancelRequest {
  proxyPort?: number
}
