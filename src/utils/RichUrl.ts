import { isPlainObject } from 'lodash-uni'

export interface ParsedRichUrl<TDesc> {
  url: string
  desc?: TDesc
}

export interface ParsedFileRichUrl {
  url: string
  file: File
}

/**
 * 富链接，同普通链接相比，富链接可包含一些描述信息。
 *
 * 结构描述：
 * ```text
 * rich://{"url":"***","desc":"***"}
 * ```
 */
export class RichUrl {
  /**
   * 标识符。
   */
  private static readonly identity = 'rich://'

  /**
   * 检查是否是富链接。
   *
   * @param value 要检查的值
   * @returns 返回检查结果
   * @example
   * ```typescript
   * RichUrl.check('http://www.google.com') // => false
   * ```
   */
  static check(value: any): value is string {
    return (
      typeof value === 'string' &&
      value.substr(0, RichUrl.identity.length) === RichUrl.identity
    )
  }

  /**
   * 创建富链接。
   *
   * @param url 普通链接
   * @param desc 描述信息
   * @returns 返回创建的富链接
   */
  static build(url: string, desc?: any): string {
    return `${RichUrl.identity}${JSON.stringify({ url, desc })}`
  }

  /**
   * 解析富链接。非富链接的会直接将其值作为 url 返回。
   *
   * @param richUrl 富链接
   * @returns 返回解析结果
   */
  static parse<TDesc>(richUrl: string): ParsedRichUrl<TDesc> {
    if (!RichUrl.check(richUrl)) {
      return {
        url: richUrl,
      }
    }
    try {
      return JSON.parse(richUrl.substr(RichUrl.identity.length))
    } catch {
      return {
        url: richUrl,
      }
    }
  }

  /**
   * 转换数据中的富链接。
   *
   * @param data 数据
   * @param callback 回调
   * @returns 返回转换后的数据
   */
  static transform<TData, TDesc>(
    data: TData,
    callback: (
      parsedRichUrl: ParsedRichUrl<TDesc>,
      data: TData,
    ) => Promise<string>,
  ): Promise<TData> {
    return new Promise(resolve => {
      if (Array.isArray(data)) {
        Promise.all(
          (data as any[]).map((value, index) => {
            return RichUrl.transform(value, callback).then(res => {
              ;(data as any[])[index] = res
            })
          }),
        ).then(() => resolve(data))
      } else if (isPlainObject(data)) {
        Promise.all(
          Object.keys(data).map(key => {
            return RichUrl.transform((data as any)[key], callback).then(res => {
              ;(data as any)[key] = res
            })
          }),
        ).then(() => resolve(data))
      } else if (RichUrl.check(data)) {
        callback(RichUrl.parse(data), data).then(resolve as any)
      } else {
        resolve(data)
      }
    })
  }

  /**
   * 将文件转换为文件富链接。
   *
   * @param file 要转换的文件
   * @returns 返回转换后的文件富链接
   */
  static fromFile(file: File): string {
    return RichUrl.build(URL.createObjectURL(file), {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    } as Partial<File>)
  }

  /**
   * 将文件富链接转换为文件和普通链接。
   *
   * @param richUrl 要转换的文件富链接
   * @returns 返回转换后的文件和普通链接
   */
  static toFile(
    richUrl: string | ParsedRichUrl<File>,
  ): Promise<ParsedFileRichUrl> {
    return new Promise((resolve, reject) => {
      const { url, desc } =
        typeof richUrl === 'string' ? RichUrl.parse<File>(richUrl) : richUrl
      if (
        !url ||
        !desc ||
        url.substr(0, 5) !== 'blob:' ||
        typeof desc !== 'object'
      ) {
        reject(
          new Error(
            `richUrl 不是一个合法的文件富链接: ${JSON.stringify(richUrl)}`,
          ),
        )
      } else {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.responseType = 'blob'
        xhr.onload = () => {
          const file = new File([xhr.response], desc.name, desc)
          resolve({
            url: url,
            file: file,
          })
        }
        xhr.onerror = reject
        xhr.send()
      }
    })
  }

  /**
   * 转换数据中的文件富链接。
   *
   * @param data 数据
   * @param callback 回调
   * @returns 返回转换后的数据
   */
  static transformFile<TData>(
    data: TData,
    callback: (parsedFileRichUrl: ParsedFileRichUrl) => Promise<string>,
  ): Promise<TData> {
    return RichUrl.transform<TData, File>(data, parsedRichUrl => {
      return RichUrl.toFile(parsedRichUrl).then(callback)
    })
  }
}
