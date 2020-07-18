/**
 * 获取微信公众号的二维码链接。
 *
 * @param accountId 公众号 ID
 * @returns 返回二维码链接
 * @example
 * ```typescript
 * getWechatPublicAccountQrcodeUrl('rmrbwx')
 * // => https://open.weixin.qq.com/qr/code?username=rmrbwx
 * ```
 */
export function getWechatPublicAccountQrcodeUrl(accountId: string): string {
  return `https://open.weixin.qq.com/qr/code?username=${accountId}`
}
