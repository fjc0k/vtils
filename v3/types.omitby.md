<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types](./types.md) &gt; [OmitBy](./types.omitby.md)

## OmitBy type

Omit all properties of given type in object type

<b>Signature:</b>

```typescript
export declare type OmitBy<T, P> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends P ? never : K;
  }[keyof T]
>;
```