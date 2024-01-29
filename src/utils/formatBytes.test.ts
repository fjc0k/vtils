import { formatBytes } from './formatBytes.ts'

describe('formatBytes', () => {
  test('表现正常', () => {
    expect(formatBytes(0)).toBe('0 B')
    expect(formatBytes(4)).toBe('4 B')
    expect(formatBytes(10)).toBe('10 B')
    expect(formatBytes(10.1)).toBe('10.1 B')
    expect(formatBytes(999)).toBe('999 B')
    expect(formatBytes(1001)).toBe('1001 B')
    expect(formatBytes(1024)).toBe('1 KB')
    expect(formatBytes(1025)).toBe('1 KB')
    expect(formatBytes(2411724.8)).toBe('2.3 MB')
    expect(formatBytes(1e16)).toBe('8.88 PB')
    expect(formatBytes(1e30)).toBe('827180.61 YB')
  })
})
