import { isPromiseLike } from './isPromiseLike'

/**
 * 准备数据。
 *
 * @param getter 数据源
 */
export function prepareData<T extends Record<string, any>>(
  getter: T,
): Promise<
  {
    [K in keyof T]: Awaited<T[K]>
  }
> {
  return Promise.all<[string, any]>(
    Object.keys(getter).map(key =>
      isPromiseLike(getter[key])
        ? getter[key].then((value: any) => [key, value])
        : [key, getter[key]],
    ),
  ).then<any>(list =>
    list.reduce<any>((res, item) => {
      res[item[0]] = item[1]
      return res
    }, {}),
  )
}
