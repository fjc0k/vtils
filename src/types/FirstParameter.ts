import { Head } from 'ts-essentials'

export type FirstParameter<T extends (...args: any[]) => any> = Head<
  Parameters<T>
>
