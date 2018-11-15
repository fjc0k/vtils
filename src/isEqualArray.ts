/**
 * 检查给定的数组是否相等。
 *
 * @param arr1 数组1
 * @param arr2 数组2
 * @returns 是（true）或否（false）
 */
export default function isEqualArray (arr1: any[], arr2: any[]): boolean {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return false
  }
  if (arr1.length !== arr2.length) {
    return false
  }
  for (let i = 0, len = arr1.length; i < len; i++) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }
  return true
}
