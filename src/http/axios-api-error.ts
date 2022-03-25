/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { APIError, APIErrorResponse, CONTENT_TYPE_ERR_V1 } from '../common/api-error'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const axiosErrorHandler = (err: any): never => {
  if (
    err.response &&
    err.response.headers &&
    err.response.headers['content-type'] == CONTENT_TYPE_ERR_V1
  ) {
    // Server returned 'application/vnd.mysterium.error+json'. Nice.
    throw new APIError(err.response.data)
  }

  // Returned format is not 'application/vnd.mysterium.error+json' -
  // Let's do out best to parse the information.
  const status = err.response?.status
  const path = err.response?.config?.url ?? err.config?.url
  let message
  if (err.response?.data) {
    // Response body has content - dump it into the 'message'
    message = JSON.stringify(err.response.data)
  } else if (status) {
    // No content returned, only HTTP status - use that to generate a message
    message = `Request failed with status code ${status}${path ? ' (path="' + path + '")' : ''}`
  } else if (err.message) {
    // Not a server error, probably failed to make a request at all.
    // Just assume the standard Error here and use the 'message'.
    message = `${err.message}${path ? ' (path="' + path + '")' : ''}`
  } else {
    // Otherwise, a default message.
    message = 'Unknown error'
  }
  const apiErr: APIErrorResponse = {
    status,
    path,
    error: {
      code: 'internal',
      message,
    },
  }
  throw new APIError(apiErr)
}
