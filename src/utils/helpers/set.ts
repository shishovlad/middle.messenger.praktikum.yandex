import merge from './merge'

type Indexed = Record<string, unknown>

function set(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string')
  }

  let res: Indexed = {}
  const arr = path.split('.').reverse()

  arr.forEach((key, index) => {
    if (index === 0) {
      res[key] = value
    } else {
      res = { [key]: res }
    }
  })

  return merge(object as Indexed, res)
}

export default set
