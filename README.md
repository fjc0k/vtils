# vtils

A business-oriented JavaScript utility library based on Lodash.

---

<!-- TOC depthFrom:2 -->

- [Why vtils?](#why-vtils)
- [Installation](#installation)
  - [Node.js](#nodejs)
  - [Deno](#deno)

<!-- /TOC -->

## Why vtils?

- Based on [Lodash](https://lodash.com/), all its modules are re-exported.
- Added many utilities, especially for Chinese developers.
- Available in a variety of module formats: `ESModule(esm)`, `CommonJS(cjs)`, `UMD(umd)`.
- Native [TypeScript](https://www.typescriptlang.org/) & [Deno](https://deno.land/) & [tree-shaking](https://webpack.js.org/guides/tree-shaking/) support.

## Installation

### Node.js

Using package managers:

```bash
# npm
npm i vtils

# yarn
yarn add vtils

# pnpm
pnpm add vtils
```

Importing utilities:

```ts
import { wait, isNumber, EventBus } from 'vtils'
```

### Deno

Importing utilities:

```ts
import {
  wait,
  isNumber,
  EventBus,
} from 'https://cdn.jsdelivr.net/npm/vtils@2.59.0/lib/index.ts'
```
