function unzip(...args: unknown[]) {
  const max = Math.max(...args.map((a) => (a as []).length))
  const res: unknown[][] = Array.from({ length: max }, () => Array(args.length))

  args.forEach((arg, i) => {
    if (!Array.isArray(arg)) {
      throw new Error(`${arg} is not array`)
    }

    arg.forEach((num, j) => {
      res[j][i] = num
    })
  })

  return res
}

export default unzip
