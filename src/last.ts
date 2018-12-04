/**
 * 返回数组 arr 的最后一项。
 *
 * @param arr 数组
 * @returns 数组的最后一项
 */
export default function last<T>(arr: T[]): T {
  return arr[arr.length - 1]
}
