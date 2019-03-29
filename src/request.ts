/* istanbul ignore file */
import { forOwn } from './forOwn'
import { inBrowser } from './inBrowser'
import { inWechatMiniProgram } from './inWechatMiniProgram'
import { omit } from './omit'
import { FileData } from './FileData'
import { defaultValue } from './defaultValue'
import { objectToQueryString } from './objectToQueryString'

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

export function request<T extends RequestOptions>(options: T): Promise<{
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
    options = defaultValue(() => ({
      data: {},
      header: {},
      method: 'GET',
      requestDataType: 'json',
      responseDataType: 'json',
    }), options) as any

    // 解析文件参数
    let file: { key: string, value: any }
    forOwn(options.data, (value, key) => {
      if (value instanceof FileData || (inBrowser() && value instanceof File)) {
        file = {
          key: key as any,
          value: value instanceof FileData ? value.get() : value,
        }
        return false
      }
    })

    // 设置 Content-Type
    if (file) {
      delete options.header['Content-Type']
    } else {
      options.header['Content-Type'] = options.header['Content-Type'] || requestDataTypeToContentType[options.requestDataType]
    }

    // 小程序请求
    if (inWechatMiniProgram()) {
      if (file) {
        options.data = omit(options.data, [file.key])
        wx.uploadFile({
          url: options.url,
          filePath: file.value,
          name: file.key,
          header: options.header,
          formData: options.data,
          success: res => {
            let data = res.data
            if (options.responseDataType === 'json') {
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
      let url = options.url
      let requestBody: string | FormData = null
      if (file) {
        requestBody = Object.keys(options.data).reduce((fd, key) => {
          fd.append(key, file.key === key ? file.value : options.data[key])
          return fd
        }, new FormData())
      } else {
        if (options.requestDataType === 'json') {
          requestBody = JSON.stringify(options.data)
        } else {
          const queryString = objectToQueryString(options.data)
          if (options.method === 'GET') {
            url += (url.indexOf('?') > -1 ? '&' : '?') + queryString
          } else {
            requestBody = queryString
          }
        }
      }
      const xhr = new XMLHttpRequest()
      xhr.open(options.method, url)
      xhr.responseType = options.responseDataType
      try {
        forOwn(options.header, (value, name) => {
          xhr.setRequestHeader(name as any, value)
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
      xhr.send(requestBody)
    }
  })
}
