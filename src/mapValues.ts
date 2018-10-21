import forOwn, { ForOwnCallback, ForOwnObj } from './forOwn'

export type MapValuesResult<T> = { [key in Extract<keyof T, string>]: any }

export default function mapValues<T extends ForOwnObj>(obj: T, callback: ForOwnCallback<T>): MapValuesResult<T> {
  const newObj: MapValuesResult<T>  = {} as any
  forOwn(obj, (value, key, source) => {
    newObj[key] = callback(value, key, source)
  })
  return newObj
}
