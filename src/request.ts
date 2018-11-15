/* istanbul ignore file */
import forOwn from './forOwn'
import inBrowser from './inBrowser'
import inWechatMiniProgram from './inWechatMiniProgram'
import { objectToQueryString } from './jsonp'
import omit from './omit'

export interface RequestOptions {
  url: string,
  data?: { [key: string]: any },
  header?: { [key: string]: string },
  method?: 'GET' | 'POST',
  requestDataType?: 'json' | 'querystring',
  responseDataType?: 'json' | 'text',
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

export class RequestFile {
  private file: string | File

  public constructor (file: string | File) {
    this.file = file
  }

  public output (): string | File {
    return this.file
  }
}

export default function request<T extends RequestOptions> (options: T): Promise<{
  data: T['responseDataType'] extends 'json' ? any : string,
  status: number,
}> {
  return new Promise<{
  data: any,
  status: number
  }>((resolve, reject) => {
    // 设置默认参数
    options = {
      ...defaultRequestOptions,
      ...(options as any),
    }

    // 解析文件参数
    let file: { key: string, value: RequestFile }
    forOwn(options.data, (value, key) => {
      if (value instanceof RequestFile) {
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
          filePath: file.value.output() as string,
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
          dataType: 'text',
          responseType: 'text',
          success: res => {
            resolve({
              data: res.data as string,
              status: res.statusCode,
            })
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
      xhr.responseType = 'text'
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
          data: xhr.responseText,
          status: xhr.status,
        })
      }
      xhr.onerror = reject
      xhr.ontimeout = reject
      xhr.onabort = reject
      xhr.send(isGet ? null : queryString)
    }
  }).then(res => {
    if (options.responseDataType === 'json') {
      try {
        res.data = JSON.parse(res.data)
      } catch (err) {
        res.data = {}
      }
    }
    return res
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
