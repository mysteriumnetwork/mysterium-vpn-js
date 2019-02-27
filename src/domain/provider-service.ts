/*
 * Copyright (C) 2019 The "mysteriumnetwork/mysterium-vpn-js" Authors.
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

import { TequilapiClient } from 'mysterium-tequilapi/lib/client'

export class ProviderService {
  constructor (
    private tequilapiClient: TequilapiClient,
    private providerId: string,
    private serviceType: string) {}

  public async start () {
    await this.tequilapiClient.serviceStart({ providerId: this.providerId, serviceType: this.serviceType })
  }

  public async stop () {
    await this.tequilapiClient.serviceStop(this.serviceType)
  }
}
