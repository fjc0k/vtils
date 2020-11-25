import { bindEvent } from './bindEvent'
import { LiteralUnion } from '../types'
import { toArray } from 'lodash-uni'

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
    const unbindChange = bindEvent(input)('change', () => {
      const files = input.files!
      unbindChange()
      document.body.removeChild(input)
      input = null as any
      resolve(Object.freeze(toArray(files)))
    })
    input.click()
  })
}
