export interface TryGetAccessor<R> {
  (): R,
}

/**
 * 尝试执行 `accessor` 返回值，若其报错，返回默认值 `defaultValue`。
 *
 * @param accessor 值获取器
 * @param defaultValue 默认值
 * @returns 返回结果值
 * @example
 * ```ts
 * const obj = { x: 1 }
 * tryGet(() => obj.x, 2) // => 1
 * tryGet(() => obj.x.y, 2) // => 2
 * ```
 */
export function tryGet<R>(accessor: TryGetAccessor<R>, defaultValue: R): R

/**
 * 尝试执行 `accessor` 返回值，若其报错，返回 `undefined`。
 *
 * @param accessor 值获取器
 * @returns 返回结果值
 * @example
 * ```ts
 * const obj = { x: 1 }
 * tryGet(() => obj.x) // => 1
 * tryGet(() => obj.x.y) // => undefined
 * ```
 */
export function tryGet<R>(accessor: TryGetAccessor<R>): R | undefined

export function tryGet<R>(accessor: TryGetAccessor<R>, defaultValue?: R): R | undefined {
  let result: R | undefined
  try {
    result = accessor()
  } catch (e) {
    result = defaultValue
  }
  return result
}
