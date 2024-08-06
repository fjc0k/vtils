<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [vae](./vae.md) &gt; [VaeSchemaParseResult](./vae.vaeschemaparseresult.md)

## VaeSchemaParseResult type

**Signature:**

```typescript
export declare type VaeSchemaParseResult<T> = {
    success: true;
    data: T;
} | {
    success: false;
    issues: VaeIssue[];
    message: string;
};
```
**References:** [VaeIssue](./vae.vaeissue.md)
