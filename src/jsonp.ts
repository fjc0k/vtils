import inBrowser from './inBrowser'
import isObject from './isObject'
import noop from './noop'
import randomString from './randomString'
import reduce from './reduce'

const objectToQueryString = (obj: object): string => {
  return reduce(
    obj,
    (str, value, key) => str += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
    ''
  )
}

export default function jsonp(url: string, data?: string | object, callbackParameter = 'callback'): Promise<any> {
  return new Promise(
    inBrowser()
      ? (resolve, reject) => {
          let script: HTMLScriptElement

          const callbackFunctionName = `jsonp${randomString()}`
          const queryString = `${
            isObject(data) ? objectToQueryString(data) : (data != null ? String(data) : '')
          }&${
            encodeURIComponent(callbackParameter)
          }=${
            encodeURIComponent(callbackFunctionName)
          }`
          const requestUrl = url + (url.indexOf('?') > -1 ? '&' : '?') + queryString;

          (window as any)[callbackFunctionName] = (response: any) => {
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
      : noop
    )
}
