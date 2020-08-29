/// <reference types="miniprogram-api-typings" />
import { AnyObject } from '../types'
import { createUrlQueryString } from '../utils'
import { ensureInMiniProgram } from './ensureInMiniProgram'
import { getCurrentPagePath } from './getCurrentPagePath'
import { getCurrentPageQuery } from './getCurrentPageQuery'

/**
 * 获取当前页面的地址（包含查询参数）。
 *
 * @param pageInstance 页面实例，默认当前页面
 * @returns 返回当前页面的地址
 */
export function getCurrentPageUrl(
  pageInstance?: WechatMiniprogram.Page.Instance<AnyObject, AnyObject>,
): string {
  return ensureInMiniProgram(() => {
    const path = getCurrentPagePath(pageInstance)
    const query = getCurrentPageQuery(pageInstance)
    const queryString = createUrlQueryString(query)
    const url = `${path}${queryString ? `?${queryString}` : ''}`
    return url
  })
}
