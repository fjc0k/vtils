/**
 * 任意函数类型。
 */
export type AnyFunction = (...args: any[]) => any

/**
 * 任意对象类型。
 */
export type AnyObject = Record<keyof any, any>

/**
 * 名义化类型。
 *
 * @example
 * ```ts
 * type User = { id: Brand<number, User>, name: string }
 * type Post = { id: Brand<number, Post>, title: string }
 * type UserIdIsNumber = User['id'] extends number ? true: false // => true
 * type PostIdIsNumber = Post['id'] extends number ? true: false // => true
 * type PostIdIsNotUserId = Post['id'] extends User['id'] ? false : true // => true
 * ```
 */
export type Brand<T, B> = T & { __kind__?: B }

/**
 * @example
 * ```ts
 * // before
 * type X = number | number[]
 * // after
 * type X = OneOrMore<number>
 * ```
 */
export type OneOrMore<T> = T | T[]

/**
 * @example
 * ```ts
 * // before
 * type X = PromiseLike<string> | string
 * // after
 * type X = AsyncOrSync<string>
 * ```
 */
export type AsyncOrSync<T> = PromiseLike<T> | T

/**
 * 返回接口 `T` 属性值的类型。
 *
 * @example
 * ```ts
 * type V = ValueOf<{ x: number, y: string, z: boolean }>
 * // => number | string | boolean
 * ```
 */
export type ValueOf<T> = T[keyof T]

/**
 * 从接口 `T` 中去除指定的属性。
 *
 * @example
 * ```ts
 * type X = Omit<
 *   { x: number, y: string, z: boolean },
 *   'x' | 'z'
 * >
 * // => { y: string }
 * ```
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 * 合并两个类型，后一个类型的定义将覆盖前一个类型的定义。
 *
 * @example
 * ```ts
 * type X = Merge<
 *   { x: number, y: number },
 *   { x: string, z: string }
 * >
 * // => { x: string, y: number, z: string }
 * ```
 */
export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N

/**
 * 字面量联合类型。
 *
 * @example
 * ```ts
 * // before: China, American 将得不到类型提示
 * type Country = 'China' | 'American' | string
 * // after: China, American 将得到类型提示
 * type Country = LiteralUnion<'China' | 'American', string>
 * ```
 */
export type LiteralUnion<L, B> = L | Brand<B, never>

/**
 * 检查 `T` 是否是 `never` 类型。
 *
 * @example
 * ```ts
 * type X = never
 * // before
 * type XIsNever = [X] extends [never] ? true : false
 * // after
 * type XIsNever = IsNever<X>
 * ```
 */
export type IsNever<T> = [T] extends [never] ? true : false

/**
 * 条件类型。
 *
 * @example
 * ```ts
 * type X = 'x'
 * // before
 * type IsX = X extends 'x' ? true : false
 * // after
 * type IsX = If<X extends 'x', true, false>
 * ```
 */
export type If<Condition, Then, Else> = Condition extends true ? Then : Else

/**
 * 从 `T` 中排除 `undefined` 类型。
 *
 * @example
 * ```ts
 * interface User {
 *   gender?: 'male' | 'female',
 * }
 * // before
 * type UserGender = Exclude<User['gender'], undefined>
 * // after
 * type UserGender = Defined<User['gender']>
 * ```
 */
export type Defined<T> = Exclude<T, undefined>
