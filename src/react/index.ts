/**
 * React 工具库。基于 {@link https://github.com/streamich/react-use#readme | react-use}。
 *
 * @packageDocumentation
 */

/* istanbul ignore file */

export * from 'react-use'

// @index(['./**/*.ts', '!./**/*.{test,taro}.*', '!./{useToggle,createGlobalState,useTitle,useInterval}.*'], f => `export * from '${f.path}'`)
export * from './useClassName'
export * from './useLoadMore'
export * from './useReachBottom'
export * from './useScrollLoadMore'
export * from './useValidator'
// @endindex

// 与 react-use 同名的应手动指定导出的模块
export { useToggle, UseToggleResult } from './useToggle'
export {
  createGlobalState,
  CreateGlobalStateResult,
  CreateGlobalStateCustomResult,
  CreateGlobalStateResultResult,
  CreateGlobalStateState,
} from './createGlobalState'
export { useTitle } from './useTitle'
export { useInterval, UseIntervalResult } from './useInterval'
