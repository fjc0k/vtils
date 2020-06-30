import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { EventBus } from '../utils'

export interface CreateGlobalStateResult<S> {
  (): readonly [S, Dispatch<SetStateAction<S>>]
  getState(): S
  setState(nextState: SetStateAction<S>): void
  watchState(callback: (nextState: S, prevState: S) => any): () => void
}

export function createGlobalState<S>(): CreateGlobalStateResult<S | undefined>

export function createGlobalState<S>(
  initialState: S,
): CreateGlobalStateResult<S>

export function createGlobalState<S>(
  initialState?: S,
): CreateGlobalStateResult<S | undefined> {
  const bus = new EventBus<{
    setGlobalState: (
      nextGlobalState: S | undefined,
      prevGlobalState: S | undefined,
    ) => void
  }>()
  let currentGlobalState: S | undefined = initialState
  const getGlobalState: () => S | undefined = () => currentGlobalState
  const setGlobalState: Dispatch<SetStateAction<
    S | undefined
  >> = nextGlobalState => {
    if (typeof nextGlobalState === 'function') {
      nextGlobalState = (nextGlobalState as any)(currentGlobalState)
    }
    if (nextGlobalState !== currentGlobalState) {
      const prevGlobalState = currentGlobalState
      currentGlobalState = nextGlobalState as any
      bus.emit('setGlobalState', nextGlobalState as any, prevGlobalState)
    }
  }
  const watchGlobalState: (
    callback: (
      nextGlobalState: S | undefined,
      prevGlobalState: S | undefined,
    ) => any,
  ) => () => void = callback => {
    return bus.on('setGlobalState', callback)
  }
  const useGlobalState: CreateGlobalStateResult<S | undefined> = (() => {
    const [state, setState] = useState(currentGlobalState)
    useEffect(() => watchGlobalState(setState), [])
    return [state, setGlobalState] as const
  }) as any
  useGlobalState.getState = getGlobalState
  useGlobalState.setState = setGlobalState
  useGlobalState.watchState = watchGlobalState
  return useGlobalState
}
