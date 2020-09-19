import { act, renderHook } from '@testing-library/react-hooks'
import { useStateWithDeps } from './useStateWithDeps'

describe('useStateWithDeps', () => {
  test('依赖为空时正常', () => {
    const { result, rerender } = renderHook(
      props => {
        const [id, setId] = useStateWithDeps(props.id, [])
        return { id, setId }
      },
      {
        initialProps: {
          id: 1,
        },
      },
    )
    expect(result.current.id).toBe(1)
    rerender({ id: 2 })
    expect(result.current.id).toBe(1)
    act(() => result.current.setId(2))
    expect(result.current.id).toBe(2)
  })

  test('依赖不为空时正常', () => {
    const { result, rerender } = renderHook(
      props => {
        const [id, setId] = useStateWithDeps(props.id, [props.id])
        return { id, setId }
      },
      {
        initialProps: {
          id: 1,
        },
      },
    )
    expect(result.current.id).toBe(1)
    rerender({ id: 2 })
    expect(result.current.id).toBe(2)
    act(() => result.current.setId(3))
    expect(result.current.id).toBe(3)
  })

  test('状态为函数时正常', () => {
    const fn = jest.fn()
    const { result, rerender } = renderHook(
      props => {
        const [id, setId] = useStateWithDeps(() => {
          fn()
          return props.id
        }, [props.id])
        return { id, setId }
      },
      {
        initialProps: {
          id: 1,
        },
      },
    )
    expect(result.current.id).toBe(1)
    expect(fn).toBeCalled().toBeCalledTimes(1)
    rerender({ id: 2 })
    expect(result.current.id).toBe(2)
    expect(fn).toBeCalled().toBeCalledTimes(2)
    act(() => result.current.setId(3))
    expect(result.current.id).toBe(3)
    expect(fn).toBeCalled().toBeCalledTimes(2)
  })
})
