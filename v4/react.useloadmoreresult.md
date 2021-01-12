<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [react](./react.md) &gt; [UseLoadMoreResult](./react.useloadmoreresult.md)

## UseLoadMoreResult interface

加载更多结果。

<b>Signature:</b>

```typescript
export declare interface UseLoadMoreResult<TItem> 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [data?](./react.useloadmoreresult.data.md) | TItem\[\] | <i>(Optional)</i> 已加载的数据 |
|  [incrementalLoading](./react.useloadmoreresult.incrementalloading.md) | boolean | 是否正在加载更多数据 |
|  [initialLoading](./react.useloadmoreresult.initialloading.md) | boolean | 是否正在加载初始数据 |
|  [loading](./react.useloadmoreresult.loading.md) | boolean | 是否正在加载数据 |
|  [loadMore](./react.useloadmoreresult.loadmore.md) | () =&gt; Promise&lt;void&gt; | 加载更多数据 |
|  [noMore](./react.useloadmoreresult.nomore.md) | boolean | 数据是否已加载完 |
|  [pageNumber](./react.useloadmoreresult.pagenumber.md) | number | 当前页码 |
|  [reload](./react.useloadmoreresult.reload.md) | () =&gt; Promise&lt;void&gt; | 从首页重新加载数据 |
|  [total](./react.useloadmoreresult.total.md) | number | 总数据量 |
