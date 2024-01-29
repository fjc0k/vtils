import { RegExpBuilder } from './RegExpBuilder.ts'

const baseRegExp = /1[3-9][0-9]{9}/

export const phoneNumberRegExpBuilder = new RegExpBuilder({
  baseRegExp: baseRegExp,
})
