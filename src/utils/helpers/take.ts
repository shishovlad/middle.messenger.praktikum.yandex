const ERROR_MESSAGE = 'ValidationError: bad value.'

function take<T>(list: T[], num: number = 1): T[] {
  if (!Array.isArray(list) || typeof num !== 'number' || !list.length) {
    throw new Error(ERROR_MESSAGE)
  }

  try {
    return list.slice(0, num)
  } catch (e) {
    throw new Error(ERROR_MESSAGE)
  }
}

export default take
