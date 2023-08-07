// ref: https://github.com/ahejlsberg/tsconf2020-demos/blob/master/template/main.ts#L108
type SubKeys<T, K extends string | number> = K extends keyof T
  ? `${K}.${DotPath<T[K]>}`
  : never

export type DotPath<T> = object extends T
  ? string
  : T extends any[]
  ? '0' | SubKeys<T, 0>
  : T extends readonly any[]
  ? Extract<keyof T, `${number}`> | SubKeys<T, Extract<keyof T, `${number}`>>
  : T extends object
  ? Extract<keyof T, string> | SubKeys<T, Extract<keyof T, string>>
  : never

export type DotPathValue<T, Path extends string> = Path extends '0'
  ? // @ts-ignore
    T[0]
  : Path extends keyof T
  ? T[Path]
  : Path extends `${infer K}.${infer R}`
  ? K extends '0'
    ? DotPathValue<
        // @ts-ignore
        T[0],
        R
      >
    : K extends keyof T
    ? DotPathValue<T[K], R>
    : unknown
  : unknown
