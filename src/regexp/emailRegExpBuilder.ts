import { RegExpBuilder } from './RegExpBuilder'

// https://github.com/sindresorhus/email-regex/blob/main/index.js
const baseRegExp = /[^.\s@:](?:[^\s@:]*[^\s@:.])?@[^.\s@]+(?:\.[^.\s@]+)*/

export const emailRegExpBuilder = new RegExpBuilder({
  baseRegExp: baseRegExp,
})
