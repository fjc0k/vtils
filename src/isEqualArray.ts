/**
 * 检查给定的数组的各项是否相等。
 *
 * @param arrs 要检查的数组
 * @returns 给定的数组的各项都相等返回 `true`，否则返回 `false`
 */
export function isEqualArray(...arrs: any[][]): boolean {
  for (let i = 0; i < arrs.length; i++) {
    if (!Array.isArray(arrs[i])) {
      return false
    }

    if (arrs[i] === arrs[0]) {
      return true
    }

    if (arrs[i].length !== arrs[0].length) {
      return false
    }

    for (let j = 0; j < arrs[i].length; j++) {
      if (arrs[i][j] !== arrs[0][j]) {
        return false
      }
    }
  }

  return true
}
