// @flow
type Property = {
  name: string,
  type: 'number' | 'string' | 'object' | 'array'
}

function validate (typeName: string, obj: Object, property: Property) {
  const value = obj[property.name]
  if (!value) {
    throw new TypeError(`${typeName}: ${property.name} is not provided`)
  }

  // eslint-disable-next-line
  if (getTypeString(value) !== property.type) {
    throw new TypeError(`${typeName}: ${property.name} should be "${property.type}"`)
  }
}

function getTypeString (value) {
  if (Array.isArray(value)) {
    return 'array'
  }
  return typeof value
}

function validateMultiple (typeName: string, obj: Object, properties: Property[]) {
  properties.forEach(property => validate(typeName, obj, property))
}

export { validateMultiple, validate }
