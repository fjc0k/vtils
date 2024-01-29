import { AnyObject } from '../types/index.ts'
import { last, mapValues } from '../utils/index.ts'
import { ensureInMiniProgram } from './ensureInMiniProgram.ts'

/**
 * 获取当前页面的查询参数，已经对每个值执行了 decodeURIComponent。
 *
 * @param pageInstance 页面实例，默认当前页面
 * @returns 返回当前页面的查询参数
 */
export function getCurrentPageQuery<
  T extends Record<string, string | undefined>,
>(pageInstance?: WechatMiniprogram.Page.Instance<AnyObject, AnyObject>): T {
  return ensureInMiniProgram(() => {
    pageInstance = pageInstance || last(getCurrentPages())!
    const query = mapValues(
      pageInstance.options || {},
      value => value && decodeURIComponent(value),
    )
    return query as any as T
  })
}
