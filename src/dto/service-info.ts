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

import { validateMultiple } from '../validation'
import { parseProposalDTO, ProposalDTO } from './proposal'
import { ServiceStatus } from './service-status'

export interface ServiceInfoDTO {
  id: string,
  status: ServiceStatus
  proposal: ProposalDTO,
  options: object
}

export function parseServiceInfoDTO (data: any) {
  // TODO: validate that status has value from ServiceStatus enum
  validateMultiple('ServiceInfoDTO', data, [
    { name: 'id', type: 'string' },
    { name: 'status', type: 'string' },
    { name: 'proposal', type: 'object' },
    { name: 'options', type: 'object' }
  ])

  return {
    id: data.id,
    status: data.status,
    proposal: parseProposalDTO(data.proposal),
    options: data.options
  }
}
