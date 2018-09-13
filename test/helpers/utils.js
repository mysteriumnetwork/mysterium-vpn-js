/*
 * Copyright (C) 2017 The "mysteriumnetwork/mysterium-vpn" Authors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// @flow

/**
 * Runs async function and captures error of it's execution.
 */
async function capturePromiseError (promise: Promise<any>): Promise<?Error> {
  try {
    await promise
  } catch (e) {
    return e
  }
  return null
}

function captureError (fn: () => any): ?Error {
  try {
    fn()
  } catch (e) {
    return e
  }
}

export {
  capturePromiseError,
  captureError
}
