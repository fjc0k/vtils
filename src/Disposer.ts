export type DisposerItemName = string | number

export type Dispose = () => void

/**
 * 处置器。
 */
export default class Disposer {
  /**
   * 待处置项目存放容器。
   *
   * @private
   */
  private jar: { [name: string]: Dispose[] } = Object.create(null)

  /**
   * 将待处置项目加入容器。
   *
   * @param name 待处置项目名称
   * @param dispose 处置行为
   */
  public add(name: DisposerItemName, dispose: Dispose | Dispose[]): void {
    dispose = Array.isArray(dispose) ? dispose : [dispose]
    this.jar[name] = [
      ...(this.jar[name] || []),
      ...dispose
    ]
  }

  /**
   * 处置项目。
   *
   * @param name 欲处置项目名称
   */
  public dispose(name: DisposerItemName): void {
    (this.jar[name] || /* istanbul ignore next */ []).forEach(dispose => dispose())
    delete this.jar[name]
  }

  /**
   * 处置所有未处置项目。
   */
  public disposeAll(): void {
    for (const key in this.jar) {
      this.dispose(key)
    }
  }
}
