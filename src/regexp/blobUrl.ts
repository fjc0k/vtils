import { RegExpBuilder } from './RegExpBuilder'

const baseRegExp = /blob:.+\/[\w-]{36,}(?:#.+)?/

export const blobUrlRegExpBuilder = new RegExpBuilder({
  baseRegExp: baseRegExp,
})
