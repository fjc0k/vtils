// https://github.com/fregante/doma/blob/master/index.ts

/**
 * 将 HTML 字符串转为 DocumentFragment。
 *
 * @param html HTML 字符串
 */
export function htmlToDocumentFragment(html: string): DocumentFragment {
  if (html == null) {
    return new DocumentFragment()
  }

  const template = document.createElement('template')
  template.innerHTML = html
  return template.content
}

/**
 * 将 HTML 字符串转为 Element。
 *
 * @param html HTML 字符串
 */
export function htmlToElement<T extends Element = Element>(
  html: string,
): T | undefined {
  return (htmlToDocumentFragment(html).firstElementChild as T) ?? undefined
}
