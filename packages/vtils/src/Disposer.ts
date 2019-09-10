import {castArray} from './castArray'
import {parallel} from './parallel'

/**
 * 待释放项目。
 */
export type DisposerItem = () => void | Promise<void>

/**
 * 资源释放器。
 *
 * @example
 * ```js
 * const disposer = new Disposer()
 * const timer = setInterval(
 *   () => console.log('ok'),
 *   1000,
 * )
 * disposer.add(() => clearInterval(timer))
 * document.querySelector('#stop').onclick = () => {
 *   disposer.dispose()
 * }
 * ```
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
    for (const _item of castArray(item)) {
      if (this.jar.indexOf(_item) === -1) {
        this.jar.push(_item)
      }
    }
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
