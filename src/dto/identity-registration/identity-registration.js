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

// @flow

import { PublicKeyDTO } from './public-key'
import { SignatureDTO } from './signature'

class IdentityRegistrationDTO {
  registered: boolean
  publicKey: ?PublicKeyDTO
  signature: ?SignatureDTO

  constructor (data: { registered: boolean, publicKey: ?PublicKeyDTO, signature: ?SignatureDTO }) {
    this.registered = data.registered
    this.publicKey = data.publicKey ? new PublicKeyDTO(data.publicKey) : null
    this.signature = data.signature ? new SignatureDTO(data.signature) : null
  }
}

export default IdentityRegistrationDTO
