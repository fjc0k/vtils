/**
 * 返回对象数组中指定的一列。
 *
 * @param arr 要操作的对象数组
 * @param columnKey 列的键值
 * @param indexKey 作为返回对象的键的列，若不设置，则返回数组
 * @returns 列对象或数组
 */
export function column<
  O extends Record<string, any>,
  CK extends keyof O,
  IK extends keyof O,
>(
  arr: O[],
  columnKey: CK,
  indexKey?: IK,
): IK extends undefined ? Array<O[CK]> : Record<O[IK], O[CK]> {
  return arr.reduce<any>(
    (res, item, index) => {
      res[indexKey ? item[indexKey] : index] = item[columnKey]
      return res
    },
    indexKey ? {} : [],
  )
}
