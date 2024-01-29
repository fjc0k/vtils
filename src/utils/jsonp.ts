import { loadResource, LoadResourceUrlType } from './loadResource.ts'

let i = 0

/**
 * 发起 jsonp 请求。
 *
 * @param url 请求地址
 * @param keyOfCallbackName 回调函数名的键
 */
export function jsonp<T>(
  url: string,
  keyOfCallbackName = 'callback',
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const callbackName = `__vtils_jsonp_callbacks__${i++}`
    ;(window as any)[callbackName] = (result: T) => {
      resolve(result)
      delete (window as any)[callbackName]
    }
    const _url = new URL(url)
    _url.searchParams.set(keyOfCallbackName, callbackName)
    url = _url.toString()
    loadResource({
      path: url,
      type: LoadResourceUrlType.js,
    }).catch(reject)
  })
}
