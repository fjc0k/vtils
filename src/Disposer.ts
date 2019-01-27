/* eslint-disable lines-between-class-members */
/* eslint-disable no-dupe-class-members */
import randomString from './randomString'

export type Dispose = () => void

const anonymousKey: string = `__anonymous_${randomString()}__`

/**
 * 处置器。
 */
export default class Disposer<N extends string | number = string | number> {
  /**
   * 待处置项目存放容器。
   *
   * @private
   */
  private jar: { [name in N]: Dispose[] } = Object.create(null)

  /**
   * 将待处置项目加入容器。
   *
   * @param name 待处置项目名称
   * @param dispose 处置行为
   */
  public add(name: N, dispose: Dispose | Dispose[]): void
  /**
   * 将匿名待处置项目加入容器。
   *
   * @param dispose 处置行为
   */
  public add(dispose: Dispose | Dispose[]): void
  public add(name: any, dispose?: any): void {
    if (dispose == null) {
      dispose = name
      name = anonymousKey
    }
    dispose = Array.isArray(dispose) ? dispose : [dispose]
    ;(this.jar as any)[name] = [
      ...((this.jar as any)[name] || []),
      ...dispose,
    ]
  }

  /**
   * 处置项目。
   *
   * @param [name] 欲处置项目名称，不设置表示匿名项目
   */
  public dispose(name?: N): void {
    name = name != null ? name : anonymousKey as any
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
