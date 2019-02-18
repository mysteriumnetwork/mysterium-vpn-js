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

import { ServiceDefinitionDTO, parseServiceDefinitionDTO } from './service-definition'
import { validateMultiple } from '../validation'
import { MetricsDTO } from './metrics-dto'

type ProposalDTO = {
  id: number,
  providerId: string,
  serviceType: string,
  serviceDefinition: ServiceDefinitionDTO,
  metrics?: MetricsDTO
}

function parseProposalDTO (data: any): ProposalDTO {
  validateMultiple('ProposalDTO', data, [
    { name: 'id', type: 'number' },
    { name: 'providerId', type: 'string' },
    { name: 'serviceType', type: 'string' },
    { name: 'serviceDefinition', type: 'object' }
  ])

  return {
    id: data.id,
    providerId: data.providerId,
    serviceType: data.serviceType,
    serviceDefinition: parseServiceDefinitionDTO(data.serviceDefinition),
    metrics: data.metrics
  }
}

export { ProposalDTO, parseProposalDTO }
