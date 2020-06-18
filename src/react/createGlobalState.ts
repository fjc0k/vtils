import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export interface CreateGlobalStateResult<S> {
  (): readonly [S, Dispatch<SetStateAction<S>>]
  getState(): S
  setState(nextState: SetStateAction<S>): void
}

export function createGlobalState<S>(): CreateGlobalStateResult<S | undefined>

export function createGlobalState<S>(
  initialState: S,
): CreateGlobalStateResult<S>

export function createGlobalState<S>(
  initialState?: S,
): CreateGlobalStateResult<S | undefined> {
  let currentState: S | undefined = initialState
  const stateSetters: Dispatch<SetStateAction<S | undefined>>[] = []
  const getState: () => S | undefined = () => currentState
  const setState: Dispatch<SetStateAction<S | undefined>> = nextState => {
    if (typeof nextState === 'function') {
      nextState = (nextState as any)(currentState)
    }
    currentState = nextState as any
    for (const setter of stateSetters) {
      setter(nextState)
    }
  }
  const useGlobalState: CreateGlobalStateResult<S | undefined> = (() => {
    const [globalState, setGlobalState] = useState(currentState)
    useEffect(() => {
      stateSetters.push(setGlobalState)
      return () => {
        const i = stateSetters.indexOf(setGlobalState)
        /* istanbul ignore else */
        if (i !== -1) {
          stateSetters.splice(i, 1)
        }
      }
    }, [])
    return [globalState, setState] as const
  }) as any
  useGlobalState.getState = getState
  useGlobalState.setState = setState
  return useGlobalState
}
