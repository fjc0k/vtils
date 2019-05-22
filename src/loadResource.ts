import { castArray } from './castArray'
import { inBrowser } from './inBrowser'
import { isString } from './isString'

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
  return new Promise(resolve => {
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
      default:
        break
    }
    el.onload = () => resolve(el)
    el.onerror = () => {
      if (url.alternatePath) {
        _loadResource({
          type: url.type,
          path: url.alternatePath,
        }).then(resolve)
        return
      }
      resolve(el)
    }
    document.head.appendChild(el)
  })
}

/**
 * 加载图片、代码、样式等资源。
 *
 * @param url 资源地址
 * @returns 返回各个资源的 HTMLElement 对象组成的数组
 */
export function loadResource(url: string | LoadResourceUrl | Array<string | LoadResourceUrl>): Promise<Array<HTMLScriptElement | HTMLLinkElement | HTMLImageElement>> {
  if (!inBrowser()) return
  const urls: LoadResourceUrl[] = castArray(url).map(item => {
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
