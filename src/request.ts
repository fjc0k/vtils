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
  responseDataType?: 'json' | 'text' | 'jsonp',
  withCredentials?: boolean
}

const requestDataTypeToContentType: { [key in RequestOptions['requestDataType']]: string } = {
  json: 'application/json',
  querystring: 'application/x-www-form-urlencoded'
}

const defaultRequestOptions: Partial<RequestOptions> = {
  data: {},
  method: 'GET',
  requestDataType: 'json',
  responseDataType: 'json'
}

const request = (options: RequestOptions) => {
  return new Promise((resolve, reject) => {
    // 设置默认参数
    options = {
      ...defaultRequestOptions,
      ...options
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
              data: res.data as string,
              statusCode: res.statusCode as number
            })
          },
          fail: reject
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
              statusCode: res.statusCode as number,
              header: res.header as object
            })
          },
          fail: reject
        })
      }
    }

    // 浏览器请求
    if (inBrowser()) {
      const isGet = options.method === 'GET'
      const url = options.url + (
        isGet ? (options.url.indexOf('?') > -1 ? '&' : '?') + objectToQueryString(options.data) : ''
      )
      const xhr = new XMLHttpRequest()
      xhr.open(options.method, url)
      try {
        forOwn(options.header, (head, key) => {
          xhr.setRequestHeader(key, head)
        })
      } catch (err) {}
    }
  })
}

export class RequestFile {
  private file: string | File
  constructor(file: string | File) {
    this.file = file
  }
  public output(): string | File {
    return this.file
  }
}
