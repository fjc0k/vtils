import {base64UrlDecode, base64UrlEncode} from './base64'
import {isPlainObject} from './is'
import {mapValues} from './mapValues'
import {range} from './range'
import {shuffle} from './shuffle'

export type StructuredList<TItem = any> = TItem[]

export interface PackedStructuredList<TItem = any> {
  readonly __IS_PACKED_STRUCTURED_LIST__: true,
  readonly keys: Array<keyof TItem>,
  readonly values: Array<Array<TItem[keyof TItem]>>,
  readonly signature: string,
}

/**
 * 结构化列表数据转换器。
 */
export class StructuredListTransformer<TItem> {
  constructor(private list: StructuredList<TItem> | PackedStructuredList<TItem>) {}

  /**
   * 如果是打包后的结构化列表数据，则解包后返回，否则直接返回。如果是对象，则递归尝试解包。
   *
   * @param value 数据
   * @param depth 递归层级，默认：2
   * @returns 返回结果数据
   */
  static transformIfNeeded(value: any, depth: number = 2): any {
    if (isPlainObject(value)) {
      if ((value as PackedStructuredList).__IS_PACKED_STRUCTURED_LIST__ === true) {
        return new StructuredListTransformer(value as any).unpack()
      }
      if (depth > 0) {
        return mapValues(
          value,
          v => StructuredListTransformer.transformIfNeeded(v, depth - 1),
        )
      }
    }
    return value
  }

  private static rot13(str: string) {
    return str.replace(/[a-z]/gi, char => {
      return String.fromCharCode(
        char.charCodeAt(0) + (char.toLowerCase() < 'n' ? 13 : -13),
      )
    })
  }

  private static encodeValueIndexes(indexes: number[]) {
    return StructuredListTransformer.rot13(
      base64UrlEncode(
        `${new Date().getTime()}.${indexes.join('.')}`,
      ),
    )
  }

  private static decodeValueIndexes(value: string) {
    return base64UrlDecode(
      StructuredListTransformer.rot13(
        value,
      ),
    ).split('.').slice(1).map(Number)
  }

  /**
   * 打包结构化列表数据。
   *
   * @returns 返回打包后的结构化列表数据
   */
  pack(): PackedStructuredList<TItem> {
    const structuredList: StructuredList<TItem> = this.list as any
    const keys: Array<keyof TItem> = Object.keys(structuredList[0]) as any
    const valueIndexes: number[] = shuffle(range(0, keys.length))
    const values = []
    for (const structuredItem of structuredList) {
      const item = []
      for (let i = 0, len = valueIndexes.length; i < len; i++) {
        item[valueIndexes[i]] = structuredItem[keys[i]]
      }
      values.push(item)
    }
    return {
      __IS_PACKED_STRUCTURED_LIST__: true,
      keys: keys,
      values: values,
      signature: StructuredListTransformer.encodeValueIndexes(valueIndexes),
    }
  }

  /**
   * 同 `pack()`，用于返回 HTTP 回复内容时避免类型错误。
   */
  packAsHttpResponse(): StructuredList<TItem> {
    return this.pack() as any
  }

  /**
   * 解包结构化列表数据。
   *
   * @returns 返回解包后的结构化列表数据
   */
  unpack(): StructuredList<TItem> {
    const packedStructuredList: PackedStructuredList<TItem> = this.list as any
    const structuredList: TItem[] = []
    const valueIndexes = StructuredListTransformer.decodeValueIndexes(packedStructuredList.signature)
    for (const values of packedStructuredList.values) {
      const item: TItem = {} as any
      for (let i = 0, len = valueIndexes.length; i < len; i++) {
        item[packedStructuredList.keys[i]] = values[valueIndexes[i]]
      }
      structuredList.push(item)
    }
    return structuredList
  }
}
