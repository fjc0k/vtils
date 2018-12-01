import isObject from './isObject'

const flag = 0x666

export default class FileData<T = any> {
  private readonly $$instanceOf = flag

  private content: T

  /**
   * 创建一个文件数据。
   *
   * @param content 文件内容，依平台而不同，如 web 上为 File 实例，微信小程序里是文件路径字符串
   */
  public constructor(content: T) {
    this.content = content
  }

  /**
   * 获取文件内容。
   *
   * @returns 文件内容
   */
  public get(): T {
    return this.content
  }

  /**
   * 检查值是否是 FileData。
   *
   * @param value 要检查的值
   * @returns 是（true）或否（false）
   */
  public static isFileData(value: any): boolean {
    return isObject(value) && (value as any).$$instanceOf === flag
  }
}
