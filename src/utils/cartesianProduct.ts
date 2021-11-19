const supportNewFunction = (() => {
  try {
    return new Function('return 1')() === 1
  } catch (err) {
    return false
  }
})()

/**
 * 计算多个数组的笛卡尔积。
 *
 * @param arr 数组内容
 * @example
 * ```typescript
 * cartesianProduct([
 *   ['a', 'b'],
 *   [1, 2],
 * ])
 * // => [['a', 1], ['a', 2], ['b', 1], ['b', 2]]
 * ```
 */
export function cartesianProduct<T>(arr: [T[]]): [T][]
export function cartesianProduct<T, U>(arr: [T[], U[]]): [T, U][]
export function cartesianProduct<T, U, V>(arr: [T[], U[], V[]]): [T, U, V][]
export function cartesianProduct<T, U, V, W>(
  arr: [T[], U[], V[], W[]],
): [T, U, V, W][]
export function cartesianProduct<T, U, V, W, X>(
  arr: [T[], U[], V[], W[], X[]],
): [T, U, V, W, X][]
export function cartesianProduct<T, U, V, W, X, Y>(
  arr: [T[], U[], V[], W[], X[], Y[]],
): [T, U, V, W, X, Y][]
export function cartesianProduct<T, U, V, W, X, Y, Z>(
  arr: [T[], U[], V[], W[], X[], Y[], Z[]],
): [T, U, V, W, X, Y, Z][]
export function cartesianProduct(arr: any[][]): any[][]

export function cartesianProduct(arr: any[][]): any[][] {
  if (!Array.isArray(arr)) {
    throw new Error('cartesianProduct expects an array')
  }

  if (!arr.length) {
    return []
  }

  if (!Array.isArray(arr[0])) {
    throw new Error('set at index 0 must be an array')
  }

  return (
    supportNewFunction && arr.length < 100
      ? // 在支持动态构造函数环境下，并且数组长度小于 100 时使用快速模式
        cartesianProductProviders.fast
      : // 否则使用通用模式，如：小程序、数组长度大于等于 100
        cartesianProductProviders.universal
  ).run(arr)
}

const cartesianProductProviders: Record<
  'universal' | 'fast',
  {
    run(arr: any[][]): any[][]
    [K: string]: any
  }
> = {
  // https://github.com/angus-c/just/blob/master/packages/array-cartesian-product/index.js
  universal: {
    run(arr) {
      // initialize our product array
      let product = arr[0].map(function (v) {
        return [v]
      })

      for (let i = 1; i < arr.length; i++) {
        if (!Array.isArray(arr[i])) {
          throw new Error(`set at index ${i} must be an array`)
        }
        product = cartesianProductProviders.universal.baseProduct(
          product,
          arr[i],
        )
      }

      return product
    },
    baseProduct(prevProduct: any[], arr2: any[]) {
      // pre allocate all our memory
      const newProduct = new Array(prevProduct.length * arr2.length)

      for (let i = 0; i < prevProduct.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
          // always provide array to array.concat for consistent behavior
          newProduct[i * arr2.length + j] = prevProduct[i].concat([arr2[j]])
        }
      }
      return newProduct
    },
  },
  // https://github.com/ehmicky/fast-cartesian/blob/main/src/main.js
  fast: {
    cache: Object.create(null),
    run(arr) {
      const loopFunc = cartesianProductProviders.fast.getLoopFunc(arr.length)
      const result: any[][] = []
      loopFunc(arr, result)
      return result
    },
    getLoopFunc(length: number) {
      const cachedLoopFunc = cartesianProductProviders.fast.cache[length]

      if (cachedLoopFunc !== undefined) {
        return cachedLoopFunc
      }

      const loopFunc = cartesianProductProviders.fast.mGetLoopFunc(length)
      cartesianProductProviders.fast.cache[length] = loopFunc

      return loopFunc
    },
    mGetLoopFunc(length: number) {
      const prefixArr: string[] = []
      const startArr: string[] = []
      const middleArr: string[] = []
      const endArr: string[] = []

      for (let i = 0; i < length; i++) {
        prefixArr.push(
          `if (!Array.isArray(arrays[${i}])) { throw new Error('set at index ${i} must be an array') }`,
        )
        startArr.push(
          `for (var i${i} = 0; i${i} < arrays[${i}].length; i${i}++) {`,
        )
        middleArr.push(`arrays[${i}][i${i}]`)
        endArr.push(`}`)
      }

      const prefix = prefixArr.join('\n')
      const start = startArr.join('\n')
      const middle = middleArr.join(',')
      const end = endArr.join('\n')

      return new Function(
        'arrays',
        'result',
        `${prefix}\n${start}\nresult.push([${middle}])\n${end}`,
      )
    },
  },
}
