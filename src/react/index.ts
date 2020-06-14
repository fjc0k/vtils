/**
 * React 工具库。基于 {@link https://github.com/streamich/react-use#readme | react-use}。
 *
 * @packageDocumentation
 */

export * from 'react-use'

// @index(['./**/*.ts', '!./**/*.test.*', '!./useToggle.*'], f => `export * from '${f.path}'`)
export * from './useClassName'
export * from './useLoadMore'
export * from './useReachBottom'
export * from './useScrollLoadMore'
export * from './useValidator'
// @endindex

// 与 react-use 同名的应手动指定导出的模块
export { useToggle, UseToggleResult } from './useToggle'
