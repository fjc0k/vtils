<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [react](./react.md) &gt; [isVisibleValue](./react.isvisiblevalue.md)

## isVisibleValue() function

是否是渲染后可见的值。 渲染后不可见的值包括：`undefined`<!-- -->、`null`<!-- -->、`true`<!-- -->、`false`<!-- -->、空字符串。

<b>Signature:</b>

```typescript
export declare function isVisibleValue(value: any): boolean;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  value | any | 值 |

<b>Returns:</b>

boolean

返回结果

```typescript
isVisibleValue(null) // => false
isVisibleValue(0) // => true

```
