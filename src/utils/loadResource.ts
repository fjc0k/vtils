export type LoadResourceElement =
  | HTMLScriptElement
  | HTMLLinkElement
  | HTMLStyleElement
  | HTMLImageElement

/**
 * 资源类型。
 *
 * @public
 */
export enum LoadResourceUrlType {
  /** 样式资源 */
  css = 'css',

  /** 样式文本 */
  cssText = 'cssText',

  /** 代码资源 */
  js = 'js',

  /** 代码文本 */
  jsText = 'jsText',

  /** 图片资源 */
  img = 'img',
}

export type LoadResourceHook = (el: LoadResourceElement) => any

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
  hook?: LoadResourceHook
}

export interface LoadResourceOptions {
  /** 钩子 */
  hook?: LoadResourceHook
}

function loadSpecificResource(
  url: LoadResourceUrl,
): Promise<LoadResourceElement> {
  return new Promise((resolve, reject) => {
    let el!: LoadResourceElement
    switch (url.type) {
      case LoadResourceUrlType.js:
        {
          const _el = document.createElement('script')
          _el.src = url.path
          _el.async = true
          el = _el
        }
        break
      case LoadResourceUrlType.jsText:
        {
          const _el = document.createElement('script')
          _el.setAttribute('type', 'text/javascript')
          _el.textContent = url.path
          el = _el
        }
        break
      case LoadResourceUrlType.css:
        {
          const _el = document.createElement('link')
          _el.rel = 'stylesheet'
          _el.href = url.path
          el = _el
        }
        break
      case LoadResourceUrlType.cssText:
        {
          const _el = document.createElement('style')
          _el.setAttribute('type', 'text/css')
          _el.textContent = url.path
          el = _el
        }
        break
      case LoadResourceUrlType.img:
        {
          const _el = document.createElement('img')
          _el.src = url.path
          el = _el
        }
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
 * @param options 选项
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
  options?: LoadResourceOptions,
): Promise<Array<LoadResourceElement>> {
  const urls = (Array.isArray(url) ? url : [url]).map<LoadResourceUrl>(item => {
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
  return Promise.all(
    urls.map(url =>
      loadSpecificResource({
        ...url,
        hook: el => {
          options?.hook?.(el)
          url.hook?.(el)
        },
      }),
    ),
  )
}
