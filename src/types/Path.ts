/**
 * 获取对象的路径。最多支持 7 级路径。
 *
 * @deprecated 使用 `DotPath` 代替
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Path<T = any, L = any> = string | string[]

/**
 * 获取对象的路径值。最多支持 7 级路径。
 *
 * @deprecated 使用 `DotPathValue` 代替
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type PathValue<T = any, L = any> = any
