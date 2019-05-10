import { EnumerableKey, forOwn } from './forOwn'
import { inBrowser } from './inBrowser'
import { inWechatMiniProgram } from './inWechatMiniProgram'
import { isEmpty } from './isEmpty'
import { isPlainObject } from './isPlainObject'
import { objectToQueryString } from './objectToQueryString'
import { reduce } from './reduce'
import { urlJoin } from './urlJoin'

/**
 * 较常使用的请求头项目名称。
 *
 * @see https://en.wikipedia.org/wiki/List_of_HTTP_header_fields
 */
export type RequestHeaderField = (
  'A-IM' |
  'Accept' |
  'Accept-Charset' |
  'Accept-Encoding' |
  'Accept-Language' |
  'Accept-Datetime' |
  'Access-Control-Request-Method' |
  'Access-Control-Request-Headers' |
  'Authorization' |
  'Cache-Control' |
  'Connection' |
  'Content-Length' |
  'Content-MD5' |
  'Content-Type' |
  'Cookie' |
  'Date' |
  'Expect' |
  'Forwarded' |
  'From' |
  'Host' |
  'HTTP2-Settings' |
  'If-Match' |
  'If-Modified-Since' |
  'If-None-Match' |
  'If-Range' |
  'If-Unmodified-Since' |
  'Max-Forwards' |
  'Origin' |
  'Pragma' |
  'Proxy-Authorization' |
  'Range' |
  'Referer' |
  'TE' |
  'User-Agent' |
  'Upgrade' |
  'Via' |
  'Warning' |
  'Upgrade-Insecure-Requests' |
  'X-Requested-With' |
  'DNT' |
  'X-Forwarded-For' |
  'X-Forwarded-Host' |
  'X-Forwarded-Proto' |
  'Front-End-Https' |
  'X-Http-Method-Override' |
  'X-ATT-DeviceId' |
  'X-Wap-Profile' |
  'Proxy-Connection' |
  'X-UIDH' |
  'X-Csrf-Token' |
  'X-Request-ID'|
  'X-Correlation-ID' |
  'Save-Data'
)

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
}

export enum RequestBodyType {
  json = 'json',
  query = 'query',
}

export enum ResponseBodyType {
  json = 'json',
  text = 'text',
  arraybuffer = 'arraybuffer',
}

export interface RequestOptions {
  url: string,
  header?: Record<RequestHeaderField, string> & Record<string, string>,
  method?: RequestMethod,
  data?: any,
  requestBodyType?: RequestBodyType,
  responseBodyType?: ResponseBodyType,
  withCredentials?: boolean,
}

export interface RequestReturn<T> {
  data: T,
  status: number,
}

export class FileData<T> {
  constructor(private fileData: T) {}

  getFileData() {
    return this.fileData
  }
}

export function request<T = any>(options: RequestOptions) {
  return new Promise<RequestReturn<T>>((resolve, reject) => {
    const {
      url,
      header,
      method,
      data,
      requestBodyType,
      responseBodyType,
      withCredentials,
    }: RequestOptions = {
      header: {} as any,
      method: RequestMethod.GET,
      requestBodyType: RequestBodyType.json,
      responseBodyType: ResponseBodyType.json,
      ...options,
    }

    // 解析普通数据和文件数据
    const normalData: Record<EnumerableKey, any> = {}
    const fileData: Record<EnumerableKey, any> = {}
    if (isPlainObject(data)) {
      forOwn(data, (value, key) => {
        if (value && ((inBrowser() && value instanceof File) || value instanceof FileData)) {
          fileData[key] = value instanceof FileData ? value.getFileData() : value
        } else {
          normalData[key] = value
        }
      })
    }

    // 解析请求地址
    const requestUrl = method === RequestMethod.GET
      ? urlJoin(url, `?${objectToQueryString(normalData)}`)
      : url

    // 设置 Content-Type
    if (method === RequestMethod.POST) {
      header['Content-Type'] = (
        !isEmpty(fileData)
          ? 'multipart/form-data'
          : requestBodyType === RequestBodyType.json
            ? 'application/json'
            : 'application/x-www-form-urlencoded'
      )
    }

    if (inWechatMiniProgram()) {
      if (method === RequestMethod.POST && !isEmpty(fileData)) {
        const fileName = Object.keys(fileData)[0]
        wx.uploadFile({
          url: requestUrl,
          header: header,
          name: fileName,
          filePath: fileData[fileName],
          formData: normalData,
          success: res => {
            let data = res.data
            if (responseBodyType === ResponseBodyType.json) {
              try {
                data = JSON.parse(data)
              } catch (e) {}
            }
            resolve({
              data: data,
              status: res.statusCode,
            })
          },
          fail: reject,
        })
      } else {
        wx.request({
          url: requestUrl,
          method: method,
          header: header,
          data: method === RequestMethod.GET ? {} : normalData,
          responseType: responseBodyType === ResponseBodyType.arraybuffer ? 'arraybuffer' : 'text',
          dataType: responseBodyType === ResponseBodyType.json ? 'json' : '',
          success: res => {
            resolve({
              data: res.data,
              status: res.statusCode,
            } as any)
          },
          fail: reject,
        })
      }
    }

    if (inBrowser()) {
      // 解析请求主体
      let requestBody: string | FormData | null = null
      if (method === RequestMethod.POST) {
        if (isEmpty(fileData)) {
          if (requestBodyType === RequestBodyType.json) {
            requestBody = JSON.stringify(normalData)
          } else {
            requestBody = objectToQueryString(normalData)
          }
        } else {
          requestBody = reduce(
            { ...normalData, ...fileData },
            (formData, value, key) => {
              formData.append(key.toString(), value)
              return formData
            },
            new FormData(),
          )
        }
      }

      const xhr = new XMLHttpRequest()

      // 建立连接
      xhr.open(method, requestUrl)

      // 设置返回数据类型
      xhr.responseType = (
        responseBodyType === ResponseBodyType.json
          ? 'json'
          : responseBodyType === ResponseBodyType.arraybuffer
            ? 'arraybuffer'
            : 'text'
      )

      // 设置不支持的请求头可能会报错，因此尝试设置请求头
      try {
        forOwn(
          header,
          (value, key) => xhr.setRequestHeader(key, value),
        )
      } catch (e) {}

      // 跨域请求是否发送或解析 cookies
      if (withCredentials) {
        xhr.withCredentials = true
      }

      // 请求成功回调
      xhr.onload = () => resolve({
        data: xhr.response,
        status: xhr.status,
      })

      // 请求失败回调
      xhr.onerror = reject
      xhr.ontimeout = reject
      xhr.onabort = reject

      // 发送请求
      xhr.send(requestBody)
    }
  })
}
