function omit<T extends object>(obj: T, fields: (keyof T)[]) {
  const res: T = {} as T

  Object.keys(obj).forEach((key) => {
    if (fields.find((a) => a !== key)) {
      res[key as keyof T] = obj[key as keyof T]
    }
  })

  return res
  // return Object.fromEntries(
  //   Object.entries(obj).filter(([key]) => !fields.includes(key as keyof T))
  // )
}

export default omit
