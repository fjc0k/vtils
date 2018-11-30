/* istanbul ignore file */
import forOwn from './forOwn'
import inBrowser from './inBrowser'
import inWechatMiniProgram from './inWechatMiniProgram'
import { objectToQueryString } from './jsonp'
import omit from './omit'
import FileData from './FileData'

export interface RequestOptions {
  url: string,
  data?: { [key: string]: any },
  header?: { [key: string]: string },
  method?: 'GET' | 'POST',
  requestDataType?: 'json' | 'querystring',
  responseDataType?: 'json' | 'text' | 'arraybuffer',
  withCredentials?: boolean,
}

const requestDataTypeToContentType: { [key in RequestOptions['requestDataType']]: string } = {
  json: 'application/json',
  querystring: 'application/x-www-form-urlencoded',
}

const defaultRequestOptions: Partial<RequestOptions> = {
  data: {},
  header: {},
  method: 'GET',
  requestDataType: 'json',
  responseDataType: 'json',
}

export default function request<T extends RequestOptions>(options: T): Promise<{
  data: (
    T['responseDataType'] extends 'json'
      ? any
      : T['responseDataType'] extends 'string'
        ? string
        : ArrayBuffer
  ),
  status: number,
}> {
  return new Promise((resolve, reject) => {
    // 设置默认参数
    options = {
      ...defaultRequestOptions,
      ...(options as any),
    }

    // 解析文件参数
    let file: { key: string, value: FileData }
    forOwn(options.data, (value, key) => {
      if (value instanceof FileData) {
        file = { key, value }
        return false
      }
    })
    if (file) {
      options.data = omit(options.data, [file.key])
    }

    // 设置 Content-Type
    options.header['Content-Type'] = options.header['Content-Type'] || (
      file ? 'multipart/form-data' : requestDataTypeToContentType[options.requestDataType]
    )

    // 小程序请求
    if (inWechatMiniProgram()) {
      if (file) {
        wx.uploadFile({
          url: options.url,
          filePath: file.value.get() as string,
          name: file.key,
          header: options.header,
          formData: options.data,
          success: res => {
            resolve({
              data: res.data,
              status: res.statusCode,
            })
          },
          fail: reject,
        })
      } else {
        wx.request({
          url: options.url,
          data: options.data,
          header: options.header,
          method: options.method,
          dataType: options.responseDataType,
          responseType: options.responseDataType === 'arraybuffer' ? 'arraybuffer' : 'text',
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

    // 浏览器请求
    if (inBrowser()) {
      const isGet = options.method === 'GET'
      const queryString = objectToQueryString(options.data)
      const url = options.url + (
        isGet ? (options.url.indexOf('?') > -1 ? '&' : '?') + queryString : ''
      )
      const xhr = new XMLHttpRequest()
      xhr.open(options.method, url)
      xhr.responseType = options.responseDataType
      try {
        forOwn(options.header, (value, name) => {
          xhr.setRequestHeader(name, value)
        })
      } catch (err) {}
      if (options.withCredentials) {
        xhr.withCredentials = true
      }
      xhr.onload = () => {
        resolve({
          data: xhr.response,
          status: xhr.status,
        })
      }
      xhr.onerror = reject
      xhr.ontimeout = reject
      xhr.onabort = reject
      xhr.send(isGet ? null : queryString)
    }
  })
}

request.get = (options: RequestOptions) => {
  return request({
    ...options,
    method: 'GET',
  })
}

request.post = (options: RequestOptions) => {
  return request({
    ...options,
    method: 'POST',
  })
}
