/**
 * 将给定的 `URL` 片段连接在一起，然后规范化生成的地址。
 *
 * @param segments `URL` 片段的序列
 * @returns 返回规范化后的地址
 * @see https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets/URLJoin.md
 */
export function urlJoin(...segments: string[]) {
  return segments
    .join('/')
    .replace(/[/]+/g, '/')
    .replace(/^(.+):\//, '$1://')
    .replace(/^file:/, 'file:/')
    .replace(/\/(\?|&|#[^!])/g, '$1')
    .replace(/\?/g, '&')
    .replace('&', '?')
}
