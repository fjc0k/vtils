export function jestExpectEqual<T>(a: T, b: T) {
  return expect(a).toEqual(b)
}
