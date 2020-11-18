/**
 * 复制文本到剪切板。
 *
 * @param text 要复制的文本
 * @returns 返回是否复制成功
 */
export function copyTextToClipboard(text: string): boolean {
  // https://github.com/sindresorhus/copy-text-to-clipboard/blob/master/index.js
  const element = document.createElement('textarea')

  element.value = text

  // Prevent keyboard from showing on mobile
  element.setAttribute('readonly', '')

  // @ts-ignore
  element.style.contain = 'strict'
  element.style.position = 'absolute'
  element.style.left = '-9999px'
  element.style.fontSize = '12pt' // Prevent zooming on iOS

  const selection = document.getSelection()!
  let originalRange: Range | undefined
  if (selection.rangeCount > 0) {
    originalRange = selection.getRangeAt(0)
  }

  document.body.appendChild(element)
  element.select()

  // Explicit selection workaround for iOS
  element.selectionStart = 0
  element.selectionEnd = text.length

  let isSuccess = false
  try {
    isSuccess = document.execCommand('copy')
  } catch (_) {}

  document.body.removeChild(element)

  if (originalRange) {
    selection.removeAllRanges()
    selection.addRange(originalRange)
  }

  return isSuccess
}
