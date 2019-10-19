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
  RequiredProp,
  makeProps,
} from '@vtils/react'
