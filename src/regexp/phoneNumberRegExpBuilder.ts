import { RegExpBuilder } from './RegExpBuilder'

const baseRegExp = /1[3-9][0-9]{9}/

export const phoneNumberRegExpBuilder = new RegExpBuilder({
  baseRegExp: baseRegExp,
})
