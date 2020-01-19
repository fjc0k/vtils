/**
 * 获取链接的绝对地址。
 *
 * @param url 链接
 * @returns 返回绝对地址
 */
export function getAbsoluteUrl(url: string): string {
  if (typeof URL !== 'undefined') {
    return new URL(url, `${location.protocol}${location.host}`).href
  }
  if (!getAbsoluteUrl.anchorElement) {
    getAbsoluteUrl.anchorElement = document.createElement('a')
  }
  getAbsoluteUrl.anchorElement.href = url
  return getAbsoluteUrl.anchorElement.href
}

getAbsoluteUrl.anchorElement = null as HTMLAnchorElement | null
