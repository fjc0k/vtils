import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { EventBus } from '../utils'

export type CreateGlobalStateState = any

export type CreateGlobalStateCustomResult<
  S extends CreateGlobalStateState | undefined,
  R = never
> = (payload: {
  state: CreateGlobalStateResultResult<S, never>[0]
  setState: CreateGlobalStateResultResult<S, never>[1]
}) => R

export type CreateGlobalStateResultResult<
  S extends CreateGlobalStateState | undefined,
  R = never
> = [R] extends [never] ? readonly [S, Dispatch<SetStateAction<S>>] : R

export interface CreateGlobalStateResult<
  S extends CreateGlobalStateState | undefined,
  R = never
> {
  (): CreateGlobalStateResultResult<S, R>
  getState(): S
  setState(nextState: SetStateAction<S>): void
  setStatePartial(nextState: Partial<S> | ((prevState: S) => Partial<S>)): void
  watchState(callback: (nextState: S, prevState: S) => any): () => void
  watchStateImmediate(callback: (nextState: S, prevState: S) => any): () => void
}

export function createGlobalState<S extends CreateGlobalStateState, R = never>(
  customResult?: CreateGlobalStateCustomResult<S, R>,
): CreateGlobalStateResult<S | undefined, R>

export function createGlobalState<S extends CreateGlobalStateState, R = never>(
  initialState: S,
  customResult?: CreateGlobalStateCustomResult<S, R>,
): CreateGlobalStateResult<S, R>

export function createGlobalState<S extends CreateGlobalStateState, R = never>(
  _initialState?: S,
  _customResult?: CreateGlobalStateCustomResult<S | undefined, R>,
): CreateGlobalStateResult<S | undefined, R> {
  let initialState: S | undefined
  let customResult: CreateGlobalStateCustomResult<S | undefined, R> | undefined
  if (typeof _customResult === 'function') {
    initialState = _initialState
    customResult = _customResult
  } else if (typeof _initialState === 'function') {
    initialState = undefined
    customResult = _initialState as any
  } else {
    initialState = _initialState
    customResult = undefined
  }

  const bus = new EventBus<{
    setGlobalState: (
      nextGlobalState: S | undefined,
      prevGlobalState: S | undefined,
    ) => void
  }>()
  let currentGlobalState: S | undefined = initialState
  const getGlobalState: () => S | undefined = () => currentGlobalState
  const setGlobalState: Dispatch<
    SetStateAction<S | undefined>
  > = nextGlobalState => {
    if (typeof nextGlobalState === 'function') {
      nextGlobalState = (nextGlobalState as any)(currentGlobalState)
    }
    if (nextGlobalState !== currentGlobalState) {
      const prevGlobalState = currentGlobalState
      currentGlobalState = nextGlobalState as any
      bus.emit('setGlobalState', nextGlobalState as any, prevGlobalState)
    }
  }
  const setGlobalStatePartial: Dispatch<
    SetStateAction<Partial<S> | undefined>
  > = nextGlobalState => {
    if (typeof nextGlobalState === 'function') {
      nextGlobalState = (nextGlobalState as any)(currentGlobalState)
    }
    nextGlobalState = {
      ...(currentGlobalState as any),
      ...nextGlobalState,
    }
    const prevGlobalState = currentGlobalState
    currentGlobalState = nextGlobalState as any
    bus.emit('setGlobalState', nextGlobalState as any, prevGlobalState)
  }
  const watchGlobalState: (
    callback: (
      nextGlobalState: S | undefined,
      prevGlobalState: S | undefined,
    ) => any,
  ) => () => void = callback => {
    return bus.on('setGlobalState', callback)
  }
  const watchGlobalStateImmediate: (
    callback: (
      nextGlobalState: S | undefined,
      prevGlobalState: S | undefined,
    ) => any,
  ) => () => void = callback => {
    callback(initialState, undefined)
    return bus.on('setGlobalState', callback)
  }
  const useCustomResult = typeof customResult === 'function'
  const useGlobalState: CreateGlobalStateResult<S | undefined, R> = (() => {
    const [state, setState] = useState(currentGlobalState)
    useEffect(() => watchGlobalState(setState), [])
    return useCustomResult
      ? customResult!({
          state: state,
          setState: setGlobalState,
        })
      : [state, setGlobalState]
  }) as any
  useGlobalState.getState = getGlobalState
  useGlobalState.setState = setGlobalState
  useGlobalState.setStatePartial = setGlobalStatePartial
  useGlobalState.watchState = watchGlobalState
  useGlobalState.watchStateImmediate = watchGlobalStateImmediate
  return useGlobalState
}
