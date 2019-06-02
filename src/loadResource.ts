import { castArray } from './castArray'
import { isString } from './is'

/**
 * 资源类型。
 */
export enum LoadResourceUrlType {
  css = 'css',
  js = 'js',
  img = 'img',
}

/**
 * 资源地址。
 */
export interface LoadResourceUrl {
  /** 资源类型 */
  type: LoadResourceUrlType,
  /** 资源路径 */
  path: string,
  /** 备用资源路径 */
  alternatePath?: string,
}

function _loadResource(url: LoadResourceUrl): Promise<HTMLScriptElement | HTMLLinkElement | HTMLImageElement> {
  return new Promise((resolve, reject) => {
    let el!: HTMLScriptElement | HTMLLinkElement | HTMLImageElement
    switch (url.type) {
      case LoadResourceUrlType.js:
        el = document.createElement('script')
        el.src = url.path
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
    el.onload = () => resolve(el)
    el.onerror = () => {
      if (url.alternatePath) {
        _loadResource({
          type: url.type,
          path: url.alternatePath,
        }).then(resolve, reject)
        return
      }
      reject(el)
    }
    document.head.appendChild(el)
  })
}

/**
 * 加载图片、代码、样式等资源。
 *
 * @param url 资源地址
 * @returns 返回各个资源的 `HTMLElement` 对象组成的数组
 * @example
 * ```ts
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
export function loadResource(url: string | LoadResourceUrl | Array<string | LoadResourceUrl>): Promise<Array<HTMLScriptElement | HTMLLinkElement | HTMLImageElement>> {
  const urls: LoadResourceUrl[] = castArray(url)
    .map(item => {
      return !isString(item) ? item : {
        type: (
          /\.css$/i.test(item)
            ? LoadResourceUrlType.css
            : /\.(png|jpg|jpeg|gif|svg)$/i.test(item)
              ? LoadResourceUrlType.img
              : LoadResourceUrlType.js
        ),
        path: item,
      }
    })
  return Promise.all(
    urls.map(
      url => _loadResource(url),
    ),
  )
}
