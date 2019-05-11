import { isFunction } from './isFunction'

export type DisposerItem = () => void

/**
 * 资源释放器。
 */
export class Disposer {
  /**
   * 待释放项目存储容器。
   */
  private jar: DisposerItem[] = []

  /**
   * 新增待释放项目。
   *
   * @param items 待释放项目的序列
   */
  public add(...items: DisposerItem[]): void {
    this.jar.push(...items)
  }

  /**
   * 释放所有项目。
   */
  public dispose() {
    this.jar.forEach(
      item => isFunction(item) && item(),
    )
    this.jar = []
  }
}
