import { castArray, invert } from 'lodash-uni'
import { LiteralUnion, OneOrMore, ValueOf } from '../types'

export type EnumKey = string
export type EnumValue = string | number | boolean
export type EnumMap = Record<EnumKey, EnumValue>

// https://stackoverflow.com/questions/56415826/is-it-possible-to-precisely-type-invert-in-typescript
type AllValues<T extends Record<EnumKey, EnumValue>> = {
  [P in keyof T]: {
    label: P
    value: T[P] extends true ? 'true' : T[P] extends false ? 'false' : T[P]
  }
}[keyof T]
type InvertResult<T extends Record<EnumKey, EnumValue>> = {
  // @ts-ignore
  [P in AllValues<T>['value']]: Extract<AllValues<T>, { value: P }>['label']
}

type List<T extends Record<EnumKey, EnumValue>> = Array<
  {
    [P in keyof T]: {
      label: P
      value: T[P]
    }
  }[keyof T]
>

export type EnumResult<T extends EnumMap> = T &
  InvertResult<T> & {
    $list: List<T>
    $buildList: (keys: Array<keyof T> | Record<keyof T, any>) => List<T>
    $is(value: any, keys: OneOrMore<LiteralUnion<keyof T, ValueOf<T>>>): boolean
  }

/**
 * 构造枚举数据。
 *
 * @param map 枚举映射数据
 */
export function makeEnum<T extends EnumMap>(map: T): EnumResult<T> {
  const res: EnumResult<T> = {
    ...map,
    ...invert(map),
  } as any
  Object.defineProperties(res, {
    $list: {
      value: Object.keys(map).reduce<EnumResult<T>['$list']>((res, key) => {
        res.push({
          label: key,
          value: map[key] as any,
        })
        return res
      }, [] as any),
      enumerable: false,
      writable: false,
      configurable: false,
    },
    $buildList: {
      value: (keys => {
        const labelMap = Array.isArray(keys) ? undefined : keys
        keys = Array.isArray(keys) ? keys : Object.keys(keys)
        return Object.keys(map).reduce<ReturnType<EnumResult<T>['$buildList']>>(
          (res, key) => {
            if (keys.includes(key)) {
              res.push({
                label: labelMap?.[key] || key,
                value: map[key] as any,
              })
            }
            return res
          },
          [] as any,
        ) as any
      }) as EnumResult<T>['$buildList'],
      enumerable: false,
      writable: false,
      configurable: false,
    },
    $is: {
      value: ((value, keys) => {
        return castArray(keys).some(
          key => value === key || value === res[key as any],
        )
      }) as EnumResult<T>['$is'],
      enumerable: false,
      writable: false,
      configurable: false,
    },
  })
  return res
}
