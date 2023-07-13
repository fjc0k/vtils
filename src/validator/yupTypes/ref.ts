// eslint-disable-next-line @typescript-eslint/no-empty-interface,@typescript-eslint/no-unused-vars
export interface Ref<T> {}

export type Refable<T> = T | Ref<T>

export interface RefOptions<T> {
  map?: (value: any) => T
}

export declare function ref<X, T extends X>(
  path: string,
  options?: RefOptions<T>,
): Ref<X>

export declare function ref<X, T extends X>(
  path: string,
  map?: NonNullable<RefOptions<T>['map']>,
): Ref<X>
