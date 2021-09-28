<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [react](./react.md) &gt; [useStateWithDeps](./react.usestatewithdeps.md)

## useStateWithDeps() function

给 useState 插上依赖的翅膀。依赖变化时会更新状态。

<b>Signature:</b>

```typescript
export declare function useStateWithDeps<S>(state: S | (() => S), deps: React_2.DependencyList): [S, React_2.Dispatch<React_2.SetStateAction<S>>];
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  state | S \| (() =&gt; S) | 状态 |
|  deps | React\_2.DependencyList | 依赖 |

<b>Returns:</b>

\[S, React\_2.Dispatch&lt;React\_2.SetStateAction&lt;S&gt;&gt;\]

返回结果同 useState
