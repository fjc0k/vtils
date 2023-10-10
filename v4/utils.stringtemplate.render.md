<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [utils](./utils.md) &gt; [StringTemplate](./utils.stringtemplate.md) &gt; [render](./utils.stringtemplate.render.md)

## StringTemplate.render() method

渲染字符串模板。语法：

- 用 `{key}` 直接替换； - 用 `{key:param1,param2}` 执行函数替换； - 用 `{{key==='test'?'hi':'hello'}}` 执行代码替换（内部使用 eval 实现，需开启选项里的 `code` 参数）。

**Signature:**

```typescript
static render(template: string, data: Record<string, any>, options?: StringTemplateRenderOptions): string;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  template | string | 要渲染的模板 |
|  data | Record&lt;string, any&gt; | 渲染数据 |
|  options | [StringTemplateRenderOptions](./utils.stringtemplaterenderoptions.md) | _(Optional)_ 渲染选项 |

**Returns:**

string

返回渲染后字符串
