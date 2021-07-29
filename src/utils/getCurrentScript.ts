/* eslint-disable prefer-const */
// ref: https://github.com/sodatea/get-current-script/blob/main/index.js

/**
 * 返回当前正在运行的脚本所属的 `<script>` 元素。有两点限制：
 *
 * - 只在脚本被解析后首次运行时有效；
 * - 如果当前正在执行的代码是被其他代码作为回调函数或者事件处理函数调用的，会返回 `null`。
 */
export function getCurrentScript(): HTMLScriptElement | null {
  const descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
  // for chrome
  if (!descriptor && 'currentScript' in document && document.currentScript) {
    return document.currentScript as any
  }

  // for other browsers with native support for currentScript
  if (
    descriptor &&
    descriptor.get !== getCurrentScript &&
    document.currentScript
  ) {
    return document.currentScript as any
  }

  // IE 8-10 support script readyState
  // IE 11+ & Firefox support stack trace
  try {
    throw new Error()
  } catch (err) {
    // Find the second match for the "at" string to get file src url from stack.
    let ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/gi,
      ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/gi,
      stackDetails =
        ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
      scriptLocation = (stackDetails && stackDetails[1]) || false,
      line = (stackDetails && stackDetails[2]) || false,
      currentLocation = document.location.href.replace(
        document.location.hash,
        '',
      ),
      pageSource,
      inlineScriptSourceRegExp,
      inlineScriptSource,
      scripts = document.getElementsByTagName('script') // Live NodeList collection

    // try to find the matching external script first
    for (let i = 0; i < scripts.length; i++) {
      // If ready state is interactive, return the script tag
      if ((scripts[i] as any).readyState === 'interactive') {
        return scripts[i]
      }

      // If src matches, return the script tag
      if (scripts[i].src === scriptLocation) {
        return scripts[i]
      }
    }

    // if not found, the current script is likely inline
    if (scriptLocation === currentLocation) {
      pageSource = document.documentElement.outerHTML
      inlineScriptSourceRegExp = new RegExp(
        `(?:[^\\n]+?\\n){0,${
          (line as any) - 2
        }}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*`,
        'i',
      )
      inlineScriptSource = pageSource
        .replace(inlineScriptSourceRegExp, '$1')
        .trim()

      // find the matching inline script
      for (let i = 0; i < scripts.length; i++) {
        if (
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        )
          return scripts[i]
      }
    }

    // If no match, return null
    return null
  }
}
