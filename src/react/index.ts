/**
 * React 工具库。基于 {@link https://github.com/streamich/react-use#readme | react-use}。
 *
 * @packageDocumentation
 */

/* istanbul ignore file */

// prettier-ignore
export {
  // 手动导出以解决 cjs 下 Cannot redefine property 的问题
  // @index(['../../node_modules/react-use/esm/{use,create}*.js', '!**/{useToggle,createGlobalState,useTitle,useInterval,useSearchParam,useLocalStorage,useWindowSize,useHover,createRouter,useKeyboardJs,useMeasureDirty,useSpring,useWait}.js'], (f, _) => `${f.name},`)
  createBreakpoint,
  createMemo,
  createReducer,
  createReducerContext,
  createStateContext,
  useAsync,
  useAsyncFn,
  useAsyncRetry,
  useAudio,
  useBattery,
  useBeforeUnload,
  useBoolean,
  useClickAway,
  useCookie,
  useCopyToClipboard,
  useCounter,
  useCss,
  useCustomCompareEffect,
  useDebounce,
  useDeepCompareEffect,
  useDefault,
  useDrop,
  useDropArea,
  useEffectOnce,
  useEnsuredForwardedRef,
  useError,
  useEvent,
  useFavicon,
  useFirstMountState,
  useFullscreen,
  useGeolocation,
  useGetSet,
  useGetSetState,
  useHarmonicIntervalFn,
  useHash,
  useHoverDirty,
  useIdle,
  useIntersection,
  useIsomorphicLayoutEffect,
  useKey,
  useKeyPress,
  useKeyPressEvent,
  useLatest,
  useLifecycles,
  useList,
  useLocation,
  useLockBodyScroll,
  useLogger,
  useLongPress,
  useMap,
  useMeasure,
  useMedia,
  useMediaDevices,
  useMediatedState,
  useMethods,
  useMotion,
  useMount,
  useMountedState,
  useMouse,
  useMouseHovered,
  useMultiStateValidator,
  useNetwork,
  useNumber,
  useObservable,
  useOrientation,
  usePageLeave,
  usePermission,
  usePrevious,
  usePreviousDistinct,
  usePromise,
  useQueue,
  useRaf,
  useRafLoop,
  useRafState,
  useRendersCount,
  useScratch,
  useScroll,
  useScrollbarWidth,
  useScrolling,
  useSessionStorage,
  useSet,
  useSetState,
  useShallowCompareEffect,
  useSize,
  useSlider,
  useSpeech,
  useStartTyping,
  useStateList,
  useStateValidator,
  useStateWithHistory,
  useThrottle,
  useThrottleFn,
  useTimeout,
  useTimeoutFn,
  useTween,
  useUnmount,
  useUnmountPromise,
  useUpdate,
  useUpdateEffect,
  useUpsert,
  useVibrate,
  useVideo,
  useWindowScroll,
  // @endindex
} from 'react-use'

// @index(['./**/*.ts', '!./**/*.{test,taro}.*', '!./{useToggle,createGlobalState,useTitle,useInterval,useSearchParam,useLocalStorage,useWindowSize,useHover}.*'], f => `export * from '${f.path}'`)
export * from './CommonComponentProps'
export * from './defineComponent'
export * from './DeriveComponentProps'
export * from './isVisibleValue'
export * from './renderComponent'
export * from './useClassName'
export * from './useControllableValue'
export * from './useEnvironment'
export * from './useLoadMore'
export * from './useReachBottom'
export * from './useScrollLoadMore'
export * from './useStateWithDeps'
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
export { useSearchParam } from './useSearchParam'
export { useLocalStorage, UseLocalStorageResult } from './useLocalStorage'
export { useWindowSize } from './useWindowSize'
export { useHover, UseHoverOptions, UseHoverResult } from './useHover'
