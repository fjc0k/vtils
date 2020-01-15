import {isArray, isPlainObject} from './is'

/**
 * 将 File 转换为字符串。
 */
export class XUrl {
  private static readonly symbol = '\u0666\u1111XUrl\u3333\u0999'

  private static readonly separator = '\n'

  static isXUrl(url: any): url is string {
    return (
      typeof url === 'string'
        && url.substr(0, XUrl.symbol.length) === XUrl.symbol
    )
  }

  static extractUrl<TUrl>(url: TUrl): TUrl {
    return (
      XUrl.isXUrl(url)
        ? url.split(XUrl.separator)[1]
        : url
    ) as any
  }

  static extractFile(url: any): Promise<File | undefined> {
    return new Promise(resolve => {
      if (!XUrl.isXUrl(url)) return resolve()

      const [, fileUrl, fileStrInfo] = url.split(XUrl.separator)

      let fileInfo: File
      try {
        fileInfo = JSON.parse(fileStrInfo) as File
      } catch (e) {
        /* istanbul ignore next */
        return resolve()
      }

      const xhr = new XMLHttpRequest()
      xhr.open('GET', fileUrl)
      xhr.responseType = 'blob'
      xhr.onload = () => {
        const file = new File([xhr.response], fileInfo.name, fileInfo)
        resolve(file)
      }
      xhr.onerror = () => resolve()
      xhr.send()
    })
  }

  static extract<TUrl>(url: TUrl): Promise<{ url: TUrl, file: File | undefined }> {
    return Promise
      /* eslint-disable */
      .all<TUrl, File | undefined>([
        Promise.resolve(XUrl.extractUrl(url)),
        XUrl.extractFile(url),
      ])
      /* eslint-enable */
      .then(([url, file]) => ({url, file}))
  }

  static generate(file: File): string {
    return `${XUrl.symbol}${XUrl.separator}${URL.createObjectURL(file)}${XUrl.separator}${JSON.stringify({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    } as Partial<File>)}`
  }

  static transform<T>(data: T, callback: (payload: {url: string, file: File}) => Promise<string>): Promise<T> {
    return new Promise(resolve => {
      if (isArray(data)) {
        Promise
          .all(data.map((value, index) => {
            return XUrl.transform(value, callback).then(res => {
              data[index] = res
            })
          }))
          .then(() => resolve(data))
      } else if (isPlainObject(data)) {
        Promise
          .all(Object.keys(data).map(key => {
            return XUrl.transform((data as any)[key], callback).then(res => {
              (data as any)[key] = res
            })
          }))
          .then(() => resolve(data))
      } else if (XUrl.isXUrl(data)) {
        XUrl.extract(data)
          .then(callback as any)
          .then(resolve as any)
      } else {
        resolve(data)
      }
    })
  }
}
