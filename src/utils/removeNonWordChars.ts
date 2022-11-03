// https://zhuanlan.zhihu.com/p/33335629
// https://babeljs.io/repl/#?browsers=iOS%209&build=&builtIns=false&corejs=3.6&spec=false&loose=true&code_lz=MYewdgzgLgBATgUxgXhgegNoD0CGBaALwEE8AtABjwE4AdABwG8BVMASwDNWEATAfQEluCEAHM4OOgAsAvgF00AVxFA&debug=false&forceAllTransforms=true&shippedProposals=true&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=script&lineWrap=true&presets=env%2Ctypescript&prettier=true&targets=Node-12&version=7.20.1&externalPlugins=&assumptions=%7B%7D
// /[^a-zA-Z0-9\p{Unified_Ideograph}]/ug
const re =
  /(?:(?![0-9A-Za-z\u3400-\u4DBF\u4E00-\u9FFF\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])[\s\S])/g

/**
 * 从字符串中移除非单词字符（移除非英文单词、阿拉伯数字、汉字的所有字符）。
 *
 * @param value 要操作的字符串
 * @returns 返回移除非单词字符后的字符串
 */
export function removeNonWordChars(value: string): string {
  return value.replace(re, '')
}
