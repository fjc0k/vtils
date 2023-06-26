/**
 * 转换为 https 链接。
 *
 * @param url 原链接
 */
export function toHttpsUrl(url: string): string {
  url = url.replace(/^http:\/\//i, 'https://')
  return url
}
