/**
 * @public
 */
export interface ReadFileResult {
  /**
   * Returns the text contents.
   */
  text(): Promise<string>

  /**
   * Returns the JSON contents.
   */
  json<T>(): Promise<T>

  /**
   * Returns the dataURL contents.
   */
  dataUrl(): Promise<string>

  /**
   * Returns the base64 contents.
   */
  base64(): Promise<string>

  /**
   * Returns the ArrayBuffer contents.
   */
  arrayBuffer(): Promise<ArrayBuffer>
}

/**
 * Reads the contents of the given file.
 *
 * @public
 * @param file The given file.
 * @returns Returns the contents getters.
 */
export function readFile(file: File): ReadFileResult {
  const text: ReadFileResult['text'] = () => {
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

  const json: ReadFileResult['json'] = () => {
    return text().then(data => {
      try {
        return JSON.parse(data)
      } catch (err) {
        return Promise.reject(err)
      }
    })
  }

  const dataUrl: ReadFileResult['dataUrl'] = () => {
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

  const base64: ReadFileResult['base64'] = () => {
    return dataUrl().then(url => {
      return url.split(';base64,')[1]
    })
  }

  const arrayBuffer: ReadFileResult['arrayBuffer'] = () => {
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
