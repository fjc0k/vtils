import { createUrlQueryString } from './createUrlQueryString'

export interface GetEmailUrlOptions {
  /** 收件人 */
  to?: string | string[]
  /** 抄送人 */
  cc?: string | string[]
  /** 密送人 */
  bcc?: string | string[]
  /** 主题 */
  subject?: string
  /** 内容 */
  body?: string
}

/**
 * 获取邮件链接。
 *
 * @param options 选项
 */
export function getEmailUrl(options: GetEmailUrlOptions): string {
  const { to, cc, bcc, subject, body } = options
  let url = `mailto:${Array.isArray(to) ? to.join(',') : to}`
  if (cc || bcc || subject || body) {
    url += `?${createUrlQueryString({
      cc: cc && (Array.isArray(cc) ? cc.join(',') : cc),
      bcc: bcc && (Array.isArray(bcc) ? bcc.join(',') : bcc),
      subject: subject,
      body: body,
    })}`
  }
  return url
}
