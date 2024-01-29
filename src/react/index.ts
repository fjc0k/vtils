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
  useMouseWheel,
  useMultiStateValidator,
  useNetworkState,
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
export * from './CommonComponentProps.ts'
export * from './defineComponent.ts'
export * from './DeriveComponentProps.ts'
export * from './isVisibleValue.ts'
export * from './renderComponent.ts'
export * from './useClassName.ts'
export * from './useControllableValue.ts'
export * from './useEnvironment.ts'
export * from './useLoadMore.ts'
export * from './useReachBottom.ts'
export * from './useScrollLoadMore.ts'
export * from './useStaged.ts'
export * from './useStateWithDeps.ts'
export * from './useValidator.ts'
// @endindex

// 与 react-use 同名的应手动指定导出的模块
export { useToggle } from './useToggle.ts'
export type { UseToggleResult } from './useToggle.ts'
export { createGlobalState } from './createGlobalState.ts'
export type {
  CreateGlobalStateResult,
  CreateGlobalStateCustomResult,
  CreateGlobalStateResultResult,
  CreateGlobalStateState,
} from './createGlobalState.ts'
export { useTitle } from './useTitle.ts'
export { useInterval } from './useInterval.ts'
export type { UseIntervalResult } from './useInterval.ts'
export { useSearchParam } from './useSearchParam.ts'
export { useLocalStorage } from './useLocalStorage.ts'
export type { UseLocalStorageResult } from './useLocalStorage.ts'
export { useWindowSize } from './useWindowSize.ts'
export { useHover } from './useHover.ts'
export type { UseHoverOptions, UseHoverResult } from './useHover.ts'
