import forOwn from './forOwn'
import inWechatMiniProgram from './inWechatMiniProgram'

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
    options = {
      ...defaultRequestOptions,
      ...options
    }
    options.header['Content-Type'] = options.header['Content-Type'] || requestDataTypeToContentType[options.requestDataType]

    let file: { key: string, value: RequestFile }
    forOwn(options.data, (value, key) => {
      if (value instanceof RequestFile) {
        file = { key, value }
        return false
      }
    })

    if (inWechatMiniProgram()) {
      wx.request({
        ...options,
        success: () => {
          resolve()
        },
        fail: () => {
          reject()
        }
      })
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
