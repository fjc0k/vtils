import { renderHook } from '@testing-library/react-hooks'
import { useEnvironment } from './useEnvironment'

describe('useEnvironment', () => {
  test('表现正常', () => {
    const { result } = renderHook(() => useEnvironment())
    expect(result.current).toMatchSnapshot()
  })
})
