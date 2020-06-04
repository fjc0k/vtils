import { Head } from 'ts-essentials'

/**
 * 返回函数 T 第一个参数的类型。
 *
 * @public
 */
export type FirstParameter<T extends (...args: any[]) => any> = Head<
  Parameters<T>
>
