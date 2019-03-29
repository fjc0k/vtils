/* istanbul ignore file */
import { inBrowser } from './inBrowser'
import { isObject } from './isObject'
import { noop } from './noop'
import { randomString } from './randomString'
import { objectToQueryString } from './objectToQueryString'

/**
 * 发起 jsonp 请求。
 *
 * @param url 请求地址
 * @param [data] 请求数据
 * @param [callbackParameter='callback'] 携带回调函数名的参数
 * @returns 携带返回结果的 Promise 值
 */
export function jsonp(url: string, data?: string | object, callbackParameter = 'callback'): Promise<any> {
  return new Promise(
    inBrowser()
      ? (resolve, reject) => {
        let script: HTMLScriptElement = null

        const callbackFunctionName = `__jsonp__${randomString()}`
        const queryString = `${
          isObject(data) ? objectToQueryString(data) : (data != null ? String(data) : '')
        }&${
          encodeURIComponent(callbackParameter)
        }=${
          encodeURIComponent(callbackFunctionName)
        }`
        const requestUrl = url + (url.indexOf('?') > -1 ? '&' : '?') + queryString
        ;(window as any)[callbackFunctionName] = (response: any) => {
          resolve(response)
          try {
            delete (window as any)[callbackFunctionName]
            document.body.removeChild(script)
          } catch (err) {}
        }

        script = document.createElement('script')
        script.src = requestUrl
        script.async = true
        script.onerror = reject

        document.body.appendChild(script)
      }
      : noop,
  )
}
