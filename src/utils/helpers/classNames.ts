import { isArray, isPlainObject } from './isArrayOrObject'

function classNames(...args: unknown[]) {
  const list: unknown[] = []

  args.forEach((arg) => {
    if (!arg) return

    if (typeof arg === 'string' || typeof arg === 'number') {
      list.push(arg)
    }

    if (isPlainObject(arg)) {
      Object.entries(arg).forEach(([key, value]) => {
        if (value) list.push(key)
      })
    }

    if (isArray(arg)) {
      list.push(classNames(...arg))
    }
  })

  return list.join(' ')
}

console.log(classNames('foo', 'bar')) // => 'foo bar'
console.log(classNames('foo', { bar: true })) // => 'foo bar'
console.log(classNames({ 'foo-bar': true })) // => 'foo-bar'
console.log(classNames({ 'foo-bar': false })) // => ''
console.log(classNames({ foo: true }, { bar: true })) // => 'foo bar'
console.log(classNames({ foo: true, bar: true })) // => 'foo bar'
console.log(
  classNames('foo', { bar: true, duck: false }, 'baz', { quux: true })
) // => 'foo bar baz quux'
console.log(classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, '')) // => 'bar 1'
console.log(classNames('bar', [1, null, 'baz'], { baz: true }, '3')) // => 'bar 1 baz baz 3'
console.log(
  classNames('bar', [1, null, 'baz', ['foo', 'test']], { baz: true }, '3')
) // => 'bar 1 baz foo test baz 3'
