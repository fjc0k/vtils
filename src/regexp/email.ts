import { RegExpBuilder } from './RegExpBuilder'

// https://github.com/colinhacks/zod/blob/master/src/types.ts#LL560C19-L560C19
const baseRegExp =
  /([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}/i

export const emailRegExpBuilder = new RegExpBuilder({
  baseRegExp: baseRegExp,
})
