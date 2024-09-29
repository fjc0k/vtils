import { toArray } from 'lodash-uni'
import { LiteralUnion } from '../types'
import { bindEvent } from './bindEvent'
import { wait } from './wait'

/**
 * 选择文件。
 *
 * @param accept 接受的文件类型
 * @param multiple 是否多选
 * @returns 返回选中的文件列表
 */
export function chooseFile(
  accept: LiteralUnion<'image', string>,
  multiple = false,
): Promise<ReadonlyArray<File>> {
  return new Promise(resolve => {
    let input = document.createElement('input')
    input.style.all = 'unset'
    input.style.position = 'fixed'
    input.style.top = '0px'
    input.style.clip = 'rect(0, 0, 0, 0)'
    input.style.webkitUserSelect = 'text'
    // @ts-ignore
    input.style.MozUserSelect = 'text'
    // @ts-ignore
    input.style.msUserSelect = 'text'
    input.style.userSelect = 'text'
    input.type = 'file'
    input.accept = accept === 'image' ? '.jpg,.jpeg,.png,.gif' : accept
    input.multiple = multiple
    document.body.appendChild(input)

    const handleChange = () => {
      unbindChange()
      unbindCancel()
      unbindFocus()
      unbindTouchend()
      if (input) {
        const files = input.files || []
        document.body.removeChild(input)
        input = null as any
        resolve(Object.freeze(toArray(files)))
      }
    }
    const unbindChange = bindEvent(input)('change', handleChange)

    // 标准取消监听 但有兼容问题
    // https://caniuse.com/?search=HTMLInputElement%20cancel
    const unbindCancel = bindEvent(input)('cancel', handleChange)

    // 取消监听 hack
    // https://stackoverflow.com/a/67603015
    const unbindFocus = bindEvent(window)('focus', () =>
      wait(1000).then(handleChange),
    )
    const unbindTouchend = bindEvent(window)('touchend', () =>
      wait(1000).then(handleChange),
    )

    input.click()
  })
}
