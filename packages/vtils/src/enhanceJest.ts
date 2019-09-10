/**
 * 这是一个 jest 测试辅助函数，等同于 `expect(actual).toEqual(expected)`，只不过是加上了类型。
 *
 * @param actual 测试值
 * @param expected 期望值列表
 */
export function jestExpectEqual<T>(actual: T, ...expected: T[]) {
  expected.forEach(item => {
    expect(actual).toEqual(item)
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function expectType<T>(value: T) {}
