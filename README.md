# vtils

A business-oriented JavaScript utility library based on Lodash.

---

<!-- TOC depthFrom:2 -->

- [Why vtils?](#why-vtils)
- [Installation](#installation)

<!-- /TOC -->

## Why vtils?

- Based on [Lodash](https://lodash.com/), all its modules are re-exported.
- Added many utilities, especially for Chinese developers.
- Available in a variety of module formats: `ESModule(esm)`, `CommonJS(cjs)`, `UMD(umd)`.
- Native [TypeScript](https://www.typescriptlang.org/) & [tree-shaking](https://webpack.js.org/guides/tree-shaking/) support.

## Installation

Using package managers to install `vtils`:

```bash
# npm
npm i vtils

# yarn
yarn add vtils

# pnpm
pnpm add vtils
```

Importing utilities from `vtils`:

```ts
import { wait, isNumber, EventBus } from 'vtils'
```
