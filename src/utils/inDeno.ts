declare const Deno: any

let yes!: boolean

/**
 * 检查是否在 Deno 中。
 *
 * @returns 返回检查结果
 * @example
 * ```typescript
 * if (inDeno()) {
 *   console.log('你在 Deno 中')
 * }
 * ```
 */
export function inDeno(): boolean {
  if (yes == null) {
    yes =
      typeof Deno === 'object' &&
      typeof Deno['version'] === 'object' &&
      Deno['version']['deno'] != null
  }
  return yes
}
