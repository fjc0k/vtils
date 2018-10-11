let isSupportPassiveEventListener: boolean | undefined

/**
 * 检测是否支持 passive 模式的事件监听。
 *
 * @returns 是（true）或否（false）
 */
export default function supportPassiveEventListener(): boolean {
  if (isSupportPassiveEventListener === undefined) {
    isSupportPassiveEventListener = false
    try {
      const options = Object.defineProperty({}, 'passive', {
        get() {
          isSupportPassiveEventListener = true
        }
      })
      window.addEventListener('test', null, options)
    } catch (err) {}
  }
  return isSupportPassiveEventListener
}
