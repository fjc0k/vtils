<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types](./types.md) &gt; [NonEmptyArray](./types.nonemptyarray.md)

## NonEmptyArray type

非空数组类型。

<b>Signature:</b>

```typescript
export declare type NonEmptyArray<T> = [T, ...T[]];
```

## Example


```typescript
type X = NonEmptyArray<number>
const x: X = [] // => error

```
