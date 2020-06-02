export type AnyFunction = Record<any, any> & {
  (...args: any[]): any
}
