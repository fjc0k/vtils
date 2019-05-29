import { isPromiseLike } from './is'

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
   * @param items 待释放项目的序列
   */
  add(...items: DisposerItem[]) {
    items.forEach(item => {
      if (this.jar.indexOf(item) === -1) {
        this.jar.push(item)
      }
    })
  }

  /**
   * 释放所有项目。
   */
  dispose() {
    return (
      Promise
        .all(
          this.jar.map(item => {
            const result = item()
            if (isPromiseLike(result)) {
              return result
            }
            return Promise.resolve()
          }),
        )
        .then(() => {
          this.jar = []
        })
    )
  }
}
