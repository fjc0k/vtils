function makeDevOrProd(getNodeEnv: () => 'dev' | 'prod') {
  /**
   * 开发环境和生产环境返回不同的值或调用不同的函数。
   *
   * @param devValue 开发环境返回的值或调用的函数
   * @param prodValue 生产环境返回的值或调用的函数
   */
  function devOrProd<R, T extends R = R, F extends () => R = () => R>(
    devValue: T | F,
    prodValue: T | F,
  ): R {
    const nodeEnv = getNodeEnv()
    return nodeEnv === 'prod'
      ? typeof prodValue === 'function'
        ? (prodValue as any)()
        : prodValue
      : typeof devValue === 'function'
      ? (devValue as any)()
      : devValue
  }

  /**
   * 构造 devOrProd。
   */
  devOrProd.make = makeDevOrProd

  return devOrProd
}

/**
 * 开发环境和生产环境返回不同的值或调用不同的函数。
 *
 * `process.env.NODE_ENV` 为空值、`production`、`prod` 时被认为是生产环境，否则是开发环境。
 *
 * @param devValue 开发环境返回的值或调用的函数
 * @param prodValue 生产环境返回的值或调用的函数
 */
export const devOrProd = makeDevOrProd(() => {
  const nodeEnv = process.env.NODE_ENV
  return !nodeEnv || nodeEnv === 'production' || nodeEnv === 'prod'
    ? 'prod'
    : 'dev'
})
