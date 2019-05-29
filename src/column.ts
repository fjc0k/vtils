/**
 * 返回对象数组中指定的一列。
 *
 * @param arr 要操作的对象数组
 * @param columnKey 列的键
 * @returns 返回列值组成的数组
 */
export function column<
  O extends Record<keyof any, any>,
  CK extends keyof O,
>(arr: O[], columnKey: CK): Array<O[CK]>

/**
 * 返回对象数组中指定的一列。
 *
 * @param arr 要操作的对象数组
 * @param columnKey 列的键
 * @param indexKey 作为返回对象的键的列键
 * @returns 返回列值组成的对象
 */
export function column<
  O extends Record<keyof any, any>,
  CK extends keyof O,
  IK extends keyof O,
>(arr: O[], columnKey: CK, indexKey: IK): Record<O[IK], O[CK]>

export function column(arr: any[], columnKey: any, indexKey?: any): any {
  return arr.reduce(
    (res, item, index) => {
      res[indexKey ? item[indexKey] : index] = item[columnKey]
      return res
    },
    indexKey ? {} : [],
  )
}
