import {isPlainObject} from './is'

export type StructuredList<TItem = any> = TItem[]

export interface PackedStructuredList<TItem = any> {
  readonly __IS_PACKED_STRUCTURED_LIST__: true,
  readonly keys: Array<keyof TItem>,
  readonly values: Array<Array<TItem[keyof TItem]>>,
}

/**
 * 结构化列表数据转换器。
 */
export class StructuredListTransformer<TItem> {
  constructor(private list: StructuredList<TItem> | PackedStructuredList<TItem>) {}

  /**
   * 如果是打包后的结构化列表数据，则解包后返回，否则直接返回。
   *
   * @param value 数据
   * @returns 返回结果数据
   */
  static transformIfNeeded(value: any) {
    if (isPlainObject(value) && (value as PackedStructuredList).__IS_PACKED_STRUCTURED_LIST__ === true) {
      return new StructuredListTransformer(value as any).unpack()
    }
    return value
  }

  /**
   * 打包结构化列表数据。
   *
   * @returns 返回打包后的结构化列表数据
   */
  pack(): PackedStructuredList<TItem> {
    const structuredList: StructuredList<TItem> = this.list as any
    const keys: Array<keyof TItem> = Object.keys(structuredList[0]) as any
    const values = []
    for (const item of structuredList) {
      values.push(
        keys.map(key => item[key]),
      )
    }
    return {
      __IS_PACKED_STRUCTURED_LIST__: true,
      keys: keys,
      values: values,
    }
  }

  /**
   * 解包结构化列表数据。
   *
   * @returns 返回解包后的结构化列表数据
   */
  unpack(): StructuredList<TItem> {
    const packedStructuredList: PackedStructuredList<TItem> = this.list as any
    const structuredList: TItem[] = []
    for (const values of packedStructuredList.values) {
      const item: TItem = {} as any
      for (let i = 0, len = values.length; i < len; i++) {
        item[packedStructuredList.keys[i]] = values[i]
      }
      structuredList.push(item)
    }
    return structuredList
  }
}
