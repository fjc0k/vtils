import { AnyObject } from '../types'
import { ensureInMiniProgram } from './ensureInMiniProgram'
import { last } from '../utils'

/**
 * 获取当前页面的路径（不含查询参数），始终以 `/` 开头。
 *
 * @param pageInstance 页面实例，默认当前页面
 * @returns 返回当前页面的路径
 */
export function getCurrentPagePath(
  pageInstance?: WechatMiniprogram.Page.Instance<AnyObject, AnyObject>,
): string {
  return ensureInMiniProgram(() => {
    pageInstance = pageInstance || last(getCurrentPages())!
    const path = `/${
      pageInstance.route || /* 字节跳动 */ pageInstance.__route__
    }`.replace(/\/{2,}/g, '/')
    return path
  })
}
