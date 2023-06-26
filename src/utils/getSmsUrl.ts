export interface GetSmsUrlOptions {
  /** 手机号 */
  phoneNumber?: string
  /** 消息 */
  message?: string
  /** 用户代理 */
  userAgent?: string
}

/**
 * 获取短信链接。
 *
 * @param options 选项
 * @see https://stackoverflow.com/questions/6480462/how-to-pre-populate-the-sms-body-text-via-an-html-link
 */
export function getSmsUrl(options: GetSmsUrlOptions): string {
  const phoneNumber = options.phoneNumber || ''
  const message = options.message || ''
  let url = `sms:${phoneNumber}`
  if (!message) {
    return url
  }
  const userAgent = options.userAgent || navigator.userAgent
  const separator = /iphone|ipad|ipod|macintosh/i.test(userAgent) ? '&' : '?'
  url += `${separator}body=${encodeURIComponent(message)}`
  return url
}
