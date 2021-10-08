<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [types](./types.md) &gt; [UnionToIntersection](./types.uniontointersection.md)

## UnionToIntersection type

Convert a union type to an intersection type using \[distributive conditional types\](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html\#distributive-conditional-types).

Inspired by \[this Stack Overflow answer\](https://stackoverflow.com/a/50375286/2172153).

<b>Signature:</b>

```typescript
export declare type UnionToIntersection<Union> = (
	// `extends unknown` is always going to be the case and is used to convert the
	// `Union` into a [distributive conditional
	// type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types).
	Union extends unknown
		// The union type is used as the only argument to a function since the union
		// of function arguments is an intersection.
		? (distributedUnion: Union) => void
		// This won't happen.
		: never
		// Infer the `Intersection` type since TypeScript represents the positional
		// arguments of unions of functions as an intersection of the union.
	) extends ((mergedIntersection: infer Intersection) => void)
		? Intersection
		: never;
```

## Example


```import {UnionToIntersection} from 'type-fest';

type Union = {the(): void} | {great(arg: string): void} | {escape: boolean};

type Intersection = UnionToIntersection<Union>; //=> {the(): void; great(arg: string): void; escape: boolean}; ```

A more applicable example which could make its way into your library code follows.

@example


```
import {<!-- -->UnionToIntersection<!-- -->} from 'type-fest';

class CommandOne { commands: { a1: () =<!-- -->&gt; undefined, b1: () =<!-- -->&gt; undefined, } }

class CommandTwo { commands: { a2: (argA: string) =<!-- -->&gt; undefined, b2: (argB: string) =<!-- -->&gt; undefined, } }

const union = \[new CommandOne(), new CommandTwo()\].map(instance =<!-- -->&gt; instance.commands); type Union = typeof union; //=<!-- -->&gt; {<!-- -->a1(): void; b1(): void<!-- -->} \| {<!-- -->a2(argA: string): void; b2(argB: string): void<!-- -->}

type Intersection = UnionToIntersection<Union>; //=<!-- -->&gt; {<!-- -->a1(): void; b1(): void; a2(argA: string): void; b2(argB: string): void<!-- -->} \`\`\`

 Utilities
