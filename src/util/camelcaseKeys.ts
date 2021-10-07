/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import mapObject from 'map-obj'
import camelcase from 'camelcase'
import QuickLRU from '@alloc/quick-lru'

const cache = new QuickLRU({ maxSize: 100000 })

// Reproduces behavior from `map-obj`
const isObject = (value: unknown): boolean =>
  typeof value === 'object' &&
  value !== null &&
  !(value instanceof RegExp) &&
  !(value instanceof Error) &&
  !(value instanceof Date)

const camelCaseConvert = (input: { [key: string]: any }): typeof input => {
  if (!isObject(input)) {
    return input
  }

  const options: camelcase.Options & { deep: boolean } = {
    deep: true,
    pascalCase: false,
    locale: 'en-US',
  }

  const makeMapper =
    (parentPath: string | undefined) => (key: string, value: { [key: string]: any }) => {
      if (options.deep && isObject(value)) {
        const path = parentPath === undefined ? key : `${parentPath}.${key}`
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        value = mapObject(value as { [key: string]: any }, makeMapper(path))
      }

      const cacheKey = options.pascalCase ? `${key}_` : key

      if (cache.has(cacheKey)) {
        key = cache.get(cacheKey) as string
      } else {
        const returnValue = camelcase(key, options)

        if (key.length < 100) {
          // Prevent abuse
          cache.set(cacheKey, returnValue)
        }

        key = returnValue
      }

      return [key, value]
    }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return mapObject(input, makeMapper(undefined))
}

export const camelcaseKeys = (
  input: { [key: string]: any } | { [key: string]: any }[]
): typeof input => {
  if (Array.isArray(input)) {
    return Object.keys(input).map((key: unknown) => camelCaseConvert(input[key as number]))
  }

  return camelCaseConvert(input)
}
