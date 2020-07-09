import { renderHook } from '@testing-library/react-hooks'
import { useInterval } from './useInterval'
import { wait } from '../utils'

describe('useInterval', () => {
  test('表现正常', async () => {
    let i = 0
    const { result } = renderHook(() => useInterval(() => i++, 20))
    expect(result.current[0]).toBe(0)
    await wait(20)
    expect(result.current[0]).toBe(1)
    result.current[1].stop()
    await wait(40)
    expect(result.current[0]).toBe(1)
    result.current[1].start()
    expect(result.current[0]).toBe(2)
    await wait(20)
    expect(result.current[0]).toBe(3)
  })
})
