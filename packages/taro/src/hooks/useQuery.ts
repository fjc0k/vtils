import {isNumeric, mapValues} from 'vtils'
import {useEffect, useRouter, useState} from '@tarojs/taro'

/**
 * 获取页面的查询参数，会将类型为数值的参数值转为数字。
 *
 * @example
 * ```ts
 * const query = useQuery<{ id: number }>()
 * useEffect(() => {
 *   if (query.id != null) {
 *     console.log(typeof query.id, query.id)
 *     // 假设页面的查询参数为 id=100，则输出为：'number', 100
 *   }
 * }, [query.id])
 * ```
 */
export function useQuery<TQuery extends Record<string, any>>(): Partial<TQuery> {
  const [query, setQuery] = useState<Partial<TQuery>>({} as any)
  const route = useRouter()
  useEffect(() => {
    setQuery(
      mapValues(route.params || {}, value => {
        if (isNumeric(value)) {
          value = Number(value) as any
        }
        return value
      }) as any,
    )
  }, [route.params])
  return query
}
