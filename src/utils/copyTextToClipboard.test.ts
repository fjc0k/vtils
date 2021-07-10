import { copyTextToClipboard } from './copyTextToClipboard'

describe('copyTextToClipboard', () => {
  document.execCommand = () => true
  document.body.removeChild = () => true as any

  test('复制成功', () => {
    expect(copyTextToClipboard('123')).toBeTrue()
  })

  test('可设置容器类名', () => {
    expect(document.querySelector('.x-copy')?.tagName).toBeNil()
    expect(
      copyTextToClipboard('1234', {
        containerClass: 'x-copy',
      }),
    ).toBeTrue()
    expect(document.querySelector('.x-copy')?.tagName).toBe('TEXTAREA')
  })
})
