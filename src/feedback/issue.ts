/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface Issue {
  email?: string
  description: string
}

export interface IssueId {
  issueId: string
}

export interface IntercomIssue {
  email?: string
  description: string
  userId?: string
  userType?: string
}

export interface SupportIssueRequest {
  email: string
  description: string
}

export interface SupportIssueResponse {
  email: string
  identity: string
  ip: string
  ipType: string
  message: string
  nodeCountry: string
}
