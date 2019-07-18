/**
 * 创建一个对象，用一个数组的值作为其键名，另一个数组的值作为其值。
 *
 * @param keys 将被作为新对象的键
 * @param values 将被作为新对象的值
 * @returns 返回合并出的对象
 * @example
 * ```ts
 * combine(
 *   [1, 'hi'],
 *   [0, false],
 * ) // => { 1: 0, hi: false }
 * ```
 */
export function combine<K extends keyof any, V>(keys: K[], values: V[]) {
  const result: Record<K, V> = {} as any
  for (let i = 0, len = Math.min(keys.length, values.length); i < len; i++) {
    result[keys[i]] = values[i]
  }
  return result
}
