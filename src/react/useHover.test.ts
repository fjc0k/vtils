import { act, renderHook } from '@testing-library/react-hooks'
import { wait } from '../utils/index.ts'
import { useHover } from './useHover.ts'

describe('useHover', () => {
  test('表现正常', async () => {
    const { result } = renderHook(() =>
      useHover({
        hoverStartDelay: 10,
        hoverEndDelay: 20,
      }),
    )

    // 初始悬停态为 false
    expect(result.current.hovering).toBeFalse()

    // 悬停开始被触发后会经过指定的时间后开启悬停态
    act(() => result.current.startHover())
    expect(result.current.hovering).toBeFalse()
    await wait(15)
    expect(result.current.hovering).toBeTrue()

    // 悬停结束被触发后会经过指定的时间后关闭悬停态
    act(() => result.current.endHover())
    expect(result.current.hovering).toBeTrue()
    await wait(25)
    expect(result.current.hovering).toBeFalse()
  })
})
