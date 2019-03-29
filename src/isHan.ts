// https://mothereff.in/regexpu#input=const+regex+%3D+%2F%5E%5Cp%7BScript%3DHan%7D%2B%24%2Fu%3B&unicodePropertyEscape=1
const hanRe = /* /^\p{Script=Han}+$/u */ /^(?:[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DB5\u4E00-\u9FEF\uF900-\uFA6D\uFA70-\uFAD9]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D])+$/

/**
 * 检查 `value` 是否是汉字。
 *
 * @param value 要检查的值
 * @returns 是（true）或否（false）
 */
export function isHan(value: string): boolean {
  return hanRe.test(value)
}
