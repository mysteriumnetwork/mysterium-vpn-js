/**
 * Copyright (c) 2020 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

interface Property {
  name: string
  type: 'number' | 'string' | 'object' | 'array' | 'boolean'
}

function getTypeString(value: any): string {
  if (Array.isArray(value)) {
    return 'array'
  }
  return typeof value
}

function validate(typeName: string, obj: any, property: Property): void {
  const value = obj[property.name]
  if (typeof value === 'undefined') {
    throw new TypeError(`${typeName}: ${property.name} is not provided`)
  }

  if (getTypeString(value) !== property.type) {
    throw new TypeError(`${typeName}: ${property.name} should be "${property.type}"`)
  }
}

function validateMultiple(typeName: string, obj: any, properties: Property[]): void {
  properties.forEach((property) => validate(typeName, obj, property))
}

function validateArray(typeName: string, arr: any): void {
  if (getTypeString(arr) !== 'array') {
    throw new TypeError(`${typeName}: should be "array"`)
  }
}

export { validateMultiple, validateArray, validate }
