import { isBlobUrl } from './isBlobUrl.ts'
import { isDataUrl } from './isDataUrl.ts'
import { isUrl } from './isUrl.ts'
import { loadResource, LoadResourceUrlType } from './loadResource.ts'

const cache: Record<string, HTMLStyleElement> = Object.create(null)

export interface LoadCssResult {
  /**
   * 样式元素。
   */
  el: HTMLStyleElement

  /**
   * 销毁函数。
   */
  destroy: () => void
}

/**
 * 加载 CSS 样式，支持链接和内容。
 *
 * @param urlOrContent 链接或内容
 * @example
 * ```typescript
 * loadCss('https://foo.bar/global.css')
 * loadCss(`body { font-size: 20px; }`)
 * ```
 */
export function loadCss(urlOrContent: string): Promise<LoadCssResult> {
  return (
    urlOrContent in cache
      ? Promise.resolve(cache[urlOrContent])
      : isUrl(urlOrContent) ||
        isDataUrl(urlOrContent) ||
        isBlobUrl(urlOrContent)
      ? loadResource({
          type: LoadResourceUrlType.css,
          path: urlOrContent,
        }).then<HTMLStyleElement>(res => res[0] as any)
      : new Promise<HTMLStyleElement>(resolve => {
          const el = document.createElement('style')
          el.setAttribute('type', 'text/css')
          if ('textContent' in el) {
            el.textContent = urlOrContent
          } else {
            // @ts-ignore
            el.styleSheet.cssText = urlOrContent
          }
          document.getElementsByTagName('head')[0].appendChild(el)
          resolve(el)
        })
  ).then<LoadCssResult>(el => {
    cache[urlOrContent] = el
    return {
      el: el,
      destroy: () => {
        delete cache[urlOrContent]
        el.parentNode!.removeChild(el)
      },
    }
  })
}
