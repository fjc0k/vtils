/**
 * 各种内容类型的读取器。
 *
 * @public
 */
export interface ReadFileReader {
  /**
   * 读取并返回文本内容。
   */
  text(): Promise<string>

  /**
   * 读取并返回 JSON 内容。
   */
  json<T>(): Promise<T>

  /**
   * 读取并返回 dataURL 内容。
   */
  dataUrl(): Promise<string>

  /**
   * 读取并返回 base64 内容。
   */
  base64(): Promise<string>

  /**
   * 读取并返回 ArrayBuffer 内容。
   */
  arrayBuffer(): Promise<ArrayBuffer>
}

/**
 * 读取给定文件的内容。
 *
 * @public
 * @param file 要读取的文件
 * @returns 返回各种内容类型的读取器
 * @example
 * ```typescript
 * const file = new File(['{"x":1}'], 'x.json')
 * const reader = readFile(file)
 * console.log(await reader.text()) // => '{"x":1}'
 * console.log(await reader.json()) // => {x: 1}
 * ```
 */
export function readFile(file: File): ReadFileReader {
  const text: ReadFileReader['text'] = () => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        resolve(fileReader.result as string)
      }
      fileReader.onerror = () => {
        reject(fileReader.error)
      }
      fileReader.readAsText(file)
    })
  }

  const json: ReadFileReader['json'] = () => {
    return text().then(data => {
      try {
        return JSON.parse(data)
      } catch (err) {
        return Promise.reject(err)
      }
    })
  }

  const dataUrl: ReadFileReader['dataUrl'] = () => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        resolve(fileReader.result as string)
      }
      fileReader.onerror = () => {
        reject(fileReader.error)
      }
      fileReader.readAsDataURL(file)
    })
  }

  const base64: ReadFileReader['base64'] = () => {
    return dataUrl().then(url => {
      return url.split(';base64,')[1]
    })
  }

  const arrayBuffer: ReadFileReader['arrayBuffer'] = () => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.onload = () => {
        resolve(fileReader.result as ArrayBuffer)
      }
      fileReader.onerror = () => {
        reject(fileReader.error)
      }
      fileReader.readAsArrayBuffer(file)
    })
  }

  return { text, json, dataUrl, base64, arrayBuffer }
}
