import _cuid from 'cuid'

/**
 * 生成 CUID。
 *
 * @see https://www.npmjs.com/package/cuid
 */
export function cuid(): string {
  return _cuid()
}
