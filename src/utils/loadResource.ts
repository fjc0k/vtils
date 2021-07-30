import { castArray } from 'lodash-uni'

/**
 * 资源类型。
 *
 * @public
 */
export enum LoadResourceUrlType {
  /** 样式资源 */
  css = 'css',

  /** 代码资源 */
  js = 'js',

  /** 图片资源 */
  img = 'img',
}

/**
 * 资源地址。
 *
 * @public
 */
export interface LoadResourceUrl {
  /** 资源类型 */
  type: LoadResourceUrlType

  /** 资源路径 */
  path: string

  /** 备用资源路径 */
  alternatePath?: string

  /** 钩子 */
  hook?: (el: HTMLScriptElement | HTMLLinkElement | HTMLImageElement) => any
}

function loadSpecificResource(
  url: LoadResourceUrl,
): Promise<HTMLScriptElement | HTMLLinkElement | HTMLImageElement> {
  return new Promise((resolve, reject) => {
    let el!: HTMLScriptElement | HTMLLinkElement | HTMLImageElement
    switch (url.type) {
      case LoadResourceUrlType.js:
        el = document.createElement('script')
        el.src = url.path
        el.async = true
        break
      case LoadResourceUrlType.css:
        el = document.createElement('link')
        el.rel = 'stylesheet'
        el.href = url.path
        break
      case LoadResourceUrlType.img:
        el = document.createElement('img')
        el.src = url.path
        break
      /* istanbul ignore next */
      default:
        break
    }
    if (url.hook) {
      url.hook(el)
    }
    el.onload = () => resolve(el)
    el.onerror = () => {
      if (url.alternatePath) {
        loadSpecificResource({
          type: url.type,
          path: url.alternatePath,
        }).then(resolve, reject)
      } else {
        reject(el)
      }
    }
    if (url.type !== LoadResourceUrlType.img) {
      document.head.appendChild(el)
    }
  })
}

/**
 * 加载图片、代码、样式等资源。
 *
 * @public
 * @param url 要加载的资源地址
 * @returns 返回各资源的 HTML 元素组成的数组
 * @example
 * ```typescript
 * loadResource([
 *   'https://foo.bar/all.js',
 *   'https://foo.bar/all.css',
 *   'https://foo.bar/logo.png',
 *   {
 *     type: LoadResourceUrlType.js,
 *     path: 'https://s1.foo.bar/js/full',
 *     alternatePath: 'https://s2.foo.bar/js/full',
 *   },
 * ]).then(() => {
 *   // 资源加载完成后的操作
 * })
 * ```
 */
export function loadResource(
  url: string | LoadResourceUrl | Array<string | LoadResourceUrl>,
): Promise<Array<HTMLScriptElement | HTMLLinkElement | HTMLImageElement>> {
  const urls = castArray(url).map<LoadResourceUrl>(item => {
    return !(typeof item === 'string')
      ? item
      : {
          type: /\.css$/i.test(item)
            ? LoadResourceUrlType.css
            : /\.(png|jpg|jpeg|gif|svg)$/i.test(item)
            ? LoadResourceUrlType.img
            : LoadResourceUrlType.js,
          path: item,
        }
  })
  return Promise.all(urls.map(url => loadSpecificResource(url)))
}
