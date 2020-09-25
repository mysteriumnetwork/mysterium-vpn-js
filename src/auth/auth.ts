/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface AuthRequest {
  username: string
  password: string
}

export interface AuthResponse {
  token: string
  expiresAt: string
}

export interface ChangePasswordRequest {
  username: string
  oldPassword: string
  newPassword: string
}
