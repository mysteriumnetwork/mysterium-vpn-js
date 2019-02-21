/*
 * Copyright (C) 2018 The "mysteriumnetwork/js-tequilapi" Authors.
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

interface Property {
  name: string,
  type: 'number' | 'string' | 'object' | 'array'
}

function validate (typeName: string, obj: any, property: Property) {
  const value = obj[property.name]
  if (!value) {
    throw new TypeError(`${typeName}: ${property.name} is not provided`)
  }

  if (getTypeString(value) !== property.type) {
    throw new TypeError(`${typeName}: ${property.name} should be "${property.type}"`)
  }
}

function getTypeString (value: any) {
  if (Array.isArray(value)) {
    return 'array'
  }
  return typeof value
}

function validateMultiple (typeName: string, obj: any, properties: Property[]) {
  properties.forEach((property) => validate(typeName, obj, property))
}

export { validateMultiple, validate }
