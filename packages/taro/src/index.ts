// @index('./*', (pp, cc) => `export * from '${pp.path}'`)
export * from './getCurrentPageUrl'
export * from './hooks'
// @endindex

// === @vtils/react ===
export {
  buildFunctionComponentCreator,
  FunctionComponentCreator,
  BuildFunctionComponentCreatorOptions,
  createFunctionComponent,
} from '@vtils/react'
