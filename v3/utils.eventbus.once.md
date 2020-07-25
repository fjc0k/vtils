<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [utils](./utils.md) &gt; [EventBus](./utils.eventbus.md) &gt; [once](./utils.eventbus.once.md)

## EventBus.once() method

订阅事件，但只订阅一次即取消订阅。

<b>Signature:</b>

```typescript
once<TName extends keyof TEvents>(eventName: TName, callback: TEvents[TName]): () => any;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  eventName | TName | 事件名称 |
|  callback | TEvents\[TName\] | 事件触发回调 |

<b>Returns:</b>

() =&gt; any

返回取消订阅的函数
