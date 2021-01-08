import { ii } from './ii'

describe('ii', () => {
  test('表现正常', async () => {
    expect(ii(() => 1)).toBe(1)
    expect(await ii(() => Promise.resolve(1))).toBe(1)
  })
})
