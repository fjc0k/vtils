import { base64UrlDecode, base64UrlEncode } from './base64'
import { isPlainObject, mapValues, range, shuffle } from 'lodash-uni'
import { isType } from './isType'
import { rot13 } from './rot13'

export type RawObjectData = Record<any, any>
export type RawListData<
  TRawObjectData extends RawObjectData = RawObjectData
> = TRawObjectData[]
export type RawData<TRawObjectData extends RawObjectData = RawObjectData> =
  | TRawObjectData
  | RawListData<TRawObjectData>
export type ElementOfRawData<
  TRawData extends RawData
> = TRawData extends RawData<infer X> ? X : never
export type KeyOfRawData<
  TRawData extends RawData
> = keyof ElementOfRawData<TRawData>
export type ValueOfRawData<
  TRawData extends RawData
> = ElementOfRawData<TRawData>[KeyOfRawData<TRawData>]
export type PackedData<TRawData extends RawData> = {
  readonly _k: Array<KeyOfRawData<TRawData>>
  readonly _v: Array<Array<ValueOfRawData<TRawData>>>
  readonly _s: string
}

/**
 * 数据打包器。
 */
export class DataPacker {
  private static encodeIndexes(indexes: number[]): string {
    return rot13(
      base64UrlEncode(
        `${Math.random().toString(36).slice(2)}.${indexes.join('.')}`,
      ),
    )
  }

  private static decodeIndexes(value: string): number[] {
    return base64UrlDecode(rot13(value)).split('.').slice(1).map(Number)
  }

  /**
   * 打包数据。
   */
  static pack<TRawObjectData extends RawData>(
    rawData: TRawObjectData,
  ): PackedData<TRawObjectData> {
    const notArray = !Array.isArray(rawData)
    const rawList: RawListData = notArray ? [rawData] : (rawData as any)
    const keys: Array<KeyOfRawData<TRawObjectData>> = rawList.length
      ? shuffle(Object.keys(rawList[0]) as any)
      : []
    const indexes: number[] = shuffle(range(0, keys.length))
    const values = []
    for (const rawItem of rawList) {
      const item = []
      for (let i = 0, len = indexes.length; i < len; i++) {
        item[indexes[i]] = rawItem[keys[i]]
      }
      values.push(item)
    }
    return {
      _k: keys,
      _v: values,
      _s: DataPacker.encodeIndexes(notArray ? [-1, ...indexes] : indexes),
    }
  }

  /**
   * 返回结果同 `pack()`，不过类型是原数据的类型。
   */
  static packAsRawType<TRawObjectData extends RawData>(
    rawData: RawData<TRawObjectData>,
  ): RawData<TRawObjectData> {
    return DataPacker.pack(rawData) as any
  }

  /**
   * 解包数据。
   */
  static unpack<TRawObjectData extends RawData>(
    packedData: PackedData<TRawObjectData>,
  ): RawData<TRawObjectData> {
    const rawList: Array<RawListData<TRawObjectData>> = []
    const indexes = DataPacker.decodeIndexes(packedData._s)
    const notArray = indexes[0] === -1
    if (notArray) {
      indexes.shift()
    }
    for (const values of packedData._v) {
      const item: ElementOfRawData<TRawObjectData> = {} as any
      for (let i = 0, len = indexes.length; i < len; i++) {
        item[packedData._k[i]] = values[indexes[i]]
      }
      rawList.push(item)
    }
    return (notArray ? rawList[0] : rawList) as any
  }

  /**
   * 如果是打包后的数据，则解包后返回，否则直接返回。如果是对象，则递归尝试解包。
   *
   * @param value 数据
   * @param depth 递归层级，默认：2
   * @returns 返回结果数据
   */
  static unpackIfNeeded(value: any, depth = 2): any {
    if (isPlainObject(value) && isType<PackedData<RawObjectData>>(value)) {
      if (value._k && value._v && value._s) {
        return DataPacker.unpack(value)
      }
      if (depth > 0) {
        return mapValues(value, v => DataPacker.unpackIfNeeded(v, depth - 1))
      }
    }
    return value
  }
}
