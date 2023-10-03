import {
  PlainObject,
  isArrayOrObject,
  isPlainObject
} from './isArrayOrObject.ts'

function getParams(data: PlainObject | [], parentKey?: string) {
  const result: [string, string][] = []

  for (const [key, value] of Object.entries(data)) {
    if (isArrayOrObject(value)) {
      result.push(...getParams(value, getKey(key, parentKey)))
    } else {
      result.push([getKey(key, parentKey), encodeURIComponent(String(value))])
    }
  }

  return result
}

function getKey(key: string, parentKey?: string) {
  return parentKey ? `${parentKey}[${key}]` : key
}

function queryStringify(data: unknown = {}) {
  if (!isPlainObject(data)) {
    throw new Error('input must be an object')
  }

  const query = getParams(data)
    .map((arr) => arr.join('='))
    .join('&')

  return query.length ? `?${query}` : query
}

export default queryStringify
