/**
 * 将 File 转换为字符串。
 */
export class XUrl {
  private static divider = '\n=^=^=^=^=\n'

  static extractUrl<TUrl>(url: TUrl): TUrl {
    return (
      typeof url !== 'string'
        ? url
        : url.split(XUrl.divider)[0]
    ) as any
  }

  static extractFile(url: any): Promise<File | undefined> {
    return new Promise(resolve => {
      if (typeof url !== 'string') return resolve()

      const [fileUrl, fileStrInfo]: [string, string | undefined] = url.split(XUrl.divider) as any

      if (!fileStrInfo) return resolve()

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
      .all([
        Promise.resolve(XUrl.extractUrl(url)),
        XUrl.extractFile(url),
      ])
      .then(([url, file]) => ({url, file}))
  }

  static generate(file: File): string {
    return `${URL.createObjectURL(file)}${XUrl.divider}${JSON.stringify({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    } as Partial<File>)}`
  }
}
