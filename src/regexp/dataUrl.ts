import { RegExpBuilder } from './RegExpBuilder.ts'

const baseRegExp =
  /data:(([a-z]+\/[a-z0-9-+.]+)(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)/i

export const dataUrlRegExpBuilder = new RegExpBuilder({
  baseRegExp: baseRegExp,
})
