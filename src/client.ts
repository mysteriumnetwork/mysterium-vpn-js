/*
 * Copyright (C) 2019 The "mysteriumnetwork/js-tequilapi" Authors.
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

// TODO: move TequilapiClient and HttpTequilapiClient to 'tequilapi-client.js' and 'http-tequilapi-client.js'

import { HttpInterface } from './adapters/interface'

interface TequilapiClient {
  // TODO
}

class HttpTequilapiClient implements TequilapiClient {
  http: HttpInterface

  constructor (http: HttpInterface) {
    this.http = http
  }
}

export { TequilapiClient }
export default HttpTequilapiClient
