/**
 * 基础工具库。基于 {@link https://lodash.com/docs/4.17.15 | Lodash}。
 *
 * @packageDocumentation
 */

export * from 'lodash-es'

// @index(['./**/*.ts', '!./**/*.test.*'], f => `export * from '${f.path}'`)
export * from './base64'
export * from './bindEvent'
export * from './dedent'
export * from './EventBus'
export * from './inAndroid'
export * from './inBrowser'
export * from './inDeno'
export * from './indent'
export * from './inIOS'
export * from './inNodeJS'
export * from './inWechat'
export * from './isChineseIDCardNumber'
export * from './isPossibleChineseMobilePhoneNumber'
export * from './isUrl'
export * from './keysStrict'
export * from './loadResource'
export * from './move'
export * from './omitStrict'
export * from './pickStrict'
export * from './readFile'
export * from './swap'
export * from './wait'
export * from './Wechat'
// @endindex
