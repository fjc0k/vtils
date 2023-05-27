import { RegExpBuilder } from './RegExpBuilder'

// https://github.com/frandiox/normalize-unicode-text/blob/master/src/index.ts
// 新增 200E, 200F
const baseRegExp =
  /[\s\u180E\u200B-\u200F\u2060\uFEFF \u00A0\u1680\u2000-\u200A\u202F\u205F\u3000\u2420\u2422\u2423]/

export const blankCharsRegExpBuilder = new RegExpBuilder({
  baseRegExp: baseRegExp,
})
