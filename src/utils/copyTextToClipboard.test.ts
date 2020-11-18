import { copyTextToClipboard } from './copyTextToClipboard'

describe('copyTextToClipboard', () => {
  document.execCommand = () => true

  test('复制成功', () => {
    expect(copyTextToClipboard('123')).toBeTrue()
  })
})
