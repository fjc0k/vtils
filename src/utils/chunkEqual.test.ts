import { chunkEqual } from './chunkEqual'

describe('chunkEqual', () => {
  test('表现正常', () => {
    expect(chunkEqual([], 3, () => 100)).toMatchSnapshot()
    expect(chunkEqual([1, 2], 3, () => 100)).toMatchSnapshot()
    expect(chunkEqual([1, 2, 3], 3, () => 100)).toMatchSnapshot()
    expect(chunkEqual([1, 2, 3, 4], 3, () => 100)).toMatchSnapshot()
    expect(chunkEqual([1, 2, 3, 4, 5], 3, i => i)).toMatchSnapshot()
    expect(chunkEqual([1, 2, 3, 4, 5], 1, i => i)).toMatchSnapshot()
    expect(chunkEqual([1, 2, 3, 4, 5], 2, i => i)).toMatchSnapshot()
    expect(chunkEqual([1, 2, 3, 4, 5], 8, i => i)).toMatchSnapshot()
    expect(chunkEqual([1, 2, 3, 4, 5], 4, i => i)).toMatchSnapshot()
    expect(chunkEqual([1, 2, 3, 4], 2, () => 100)).toMatchSnapshot()
    expect(chunkEqual([1, 2, 3, 4, 5, 6], 3, () => 100)).toMatchSnapshot()
    expect(chunkEqual([1, 2, 3, 4, 5, 6], 2, () => 100)).toMatchSnapshot()
  })

  test('consistent', () => {
    expect(chunkEqual([1, 2], 3, () => 100, true)).toMatchSnapshot()
  })
})
