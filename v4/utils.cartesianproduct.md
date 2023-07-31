<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [utils](./utils.md) &gt; [cartesianProduct](./utils.cartesianproduct.md)

## cartesianProduct() function

计算多个数组的笛卡尔积。

**Signature:**

```typescript
export declare function cartesianProduct<T>(arr: [T[]]): [T][];
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  arr | \[T\[\]\] | 数组内容 |

**Returns:**

\[T\]\[\]

## Example


```typescript
cartesianProduct([
  ['a', 'b'],
  [1, 2],
])
// => [['a', 1], ['a', 2], ['b', 1], ['b', 2]]
```
