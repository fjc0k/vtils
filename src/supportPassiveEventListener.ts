import inBrowser from './inBrowser'

let isSupportPassiveEventListener: boolean | undefined

/**
 * 检测是否支持 passive 模式的事件监听。
 *
 * @returns 是（true）或否（false）
 */
export default function supportPassiveEventListener(): boolean {
  /* istanbul ignore else */
  if (isSupportPassiveEventListener === undefined) {
    isSupportPassiveEventListener = false
    try {
      const options = Object.defineProperty({}, 'passive', {
        get() {
          /* istanbul ignore next */
          isSupportPassiveEventListener = true
        }
      })
      inBrowser(() => {
        window.addEventListener('test', null, options)
      })
    } catch (err) {}
  }
  return isSupportPassiveEventListener
}
