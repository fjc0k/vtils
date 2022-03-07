/**
 * 基础工具库。基于 {@link https://lodash.com/docs/4.17.15 | Lodash}。
 *
 * @packageDocumentation
 */

/* istanbul ignore file */

export * from 'lodash-uni'

// @index(['./**/*.ts', '!./**/*.{test,perf}.*'], f => `export * from '${f.path}'`)
export * from './asRequiredDeep'
export * from './base64'
export * from './bindEvent'
export * from './Calculator'
export * from './cartesianProduct'
export * from './chooseFile'
export * from './chunkEqual'
export * from './cloneDeepFast'
export * from './constantCase'
export * from './copyTextToClipboard'
export * from './createSubmit'
export * from './createUrlQueryString'
export * from './DataPacker'
export * from './dedent'
export * from './defaultIndexTo'
export * from './devOrProd'
export * from './EventBus'
export * from './formatBytes'
export * from './formatNumber'
export * from './GeoCoord'
export * from './getCurrentScript'
export * from './getEnvironment'
export * from './getWechatPublicAccountQrcodeUrl'
export * from './htmlToDom'
export * from './ii'
export * from './inAndroid'
export * from './inBrowser'
export * from './inDeno'
export * from './indent'
export * from './inIOS'
export * from './inMiniProgram'
export * from './inNodeJS'
export * from './inTaro'
export * from './inWechatWebView'
export * from './isBlobUrl'
export * from './isChineseIDCardNumber'
export * from './isDataUrl'
export * from './isNumeric'
export * from './isPossibleChineseMobilePhoneNumber'
export * from './isPromiseLike'
export * from './isType'
export * from './isUrl'
export * from './jsonp'
export * from './keysStrict'
export * from './loadCss'
export * from './loadResource'
export * from './LocalStoragePlus'
export * from './loopUntil'
export * from './makeEnum'
export * from './md5'
export * from './move'
export * from './omitStrict'
export * from './onceMeanwhile'
export * from './parseDataUrl'
export * from './parseUrlQueryString'
export * from './pascalCase'
export * from './pickStrict'
export * from './placeKitten'
export * from './pMap'
export * from './readFile'
export * from './RichUrl'
export * from './rot13'
export * from './roundTo'
export * from './run'
export * from './sampleBy'
export * from './sampleIndex'
export * from './selectDom'
export * from './signal'
export * from './swap'
export * from './traverse'
export * from './TreeData'
export * from './wait'
export * from './Wechat'
// @endindex
