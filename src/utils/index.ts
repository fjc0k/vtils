/**
 * 基础工具库。基于 [Lodash](https://lodash.com/docs/4.17.15)。
 *
 * @packageDocumentation
 */

export * from 'lodash-es'

// @index(['./**/*.ts', '!./**/*.test.*'], f => `export * from '${f.path}'`)
export * from './base64'
export * from './bindEvent'
export * from './dedent'
export * from './EventBus'
export * from './indent'
export * from './isChineseIDCardNumber'
export * from './isPossibleChineseMobilePhoneNumber'
export * from './isUrl'
export * from './keysStrict'
export * from './loadResource'
export * from './omitStrict'
export * from './pickStrict'
export * from './readFile'
export * from './wait'
export * from './Wechat'
// @endindex
