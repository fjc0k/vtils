import { castArray } from './castArray'
import { parallel } from './parallel'

/**
 * 待释放项目。
 */
export type DisposerItem = () => void | Promise<void>

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
   * @param item 待释放项目
   */
  add(item: DisposerItem | DisposerItem[]) {
    castArray(item).forEach(item => {
      if (this.jar.indexOf(item) === -1) {
        this.jar.push(item)
      }
    })
  }

  /**
   * 释放所有项目。
   */
  dispose() {
    return parallel(this.jar).then(() => {
      this.jar = []
    })
  }
}
