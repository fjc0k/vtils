// https://github.com/fregante/select-dom/blob/master/index.ts

import { toArray, uniq } from 'lodash-uni'
import type { ParseSelector } from 'typed-query-selector/parser'

// WARNING: Overloads have to repeated in that fashion because the actual function’s signature is discarded; Only the 2 overloads are brought into the .d.ts file. Tests pass because `tsd` reads from this file instead of `.d.ts`

// ParentNode is inherited by Element, Document, DocumentFragment
type BaseElements = ParentNode | Iterable<ParentNode>

// Type predicate for TypeScript
function isQueryable(object: BaseElements): object is ParentNode {
  return typeof (object as any).querySelectorAll === 'function'
}

/**
 * @param selectors      One or more CSS selectors separated by commas
 * @param [baseElement]  The element to look inside of
 * @return               The element found, if any
 */
function selectElement<
  Selector extends string,
  TElement extends Element = ParseSelector<Selector, HTMLElement>,
>(
  selectors: Selector | Selector[],
  baseElement?: ParentNode,
): TElement | undefined
function selectElement<TElement extends Element = HTMLElement>(
  selectors: string | string[],
  baseElement?: ParentNode,
): TElement | undefined
function selectElement<TElement extends Element>(
  selectors: string | string[],
  baseElement?: ParentNode,
): TElement | undefined {
  // Shortcut with specified-but-null baseElement
  if (arguments.length === 2 && !baseElement) {
    return
  }

  return (
    (baseElement ?? document).querySelector<TElement>(String(selectors)) ??
    undefined
  )
}

/**
 * @param selectors      One or more CSS selectors separated by commas
 * @param [baseElement]  The element to look inside of
 * @return               The element found, if any
 */
function selectElementLast<
  Selector extends string,
  TElement extends Element = ParseSelector<Selector, HTMLElement>,
>(
  selectors: Selector | Selector[],
  baseElement?: ParentNode,
): TElement | undefined
function selectElementLast<TElement extends Element = HTMLElement>(
  selectors: string | string[],
  baseElement?: ParentNode,
): TElement | undefined
function selectElementLast<TElement extends Element>(
  selectors: string | string[],
  baseElement?: ParentNode,
): TElement | undefined {
  // Shortcut with specified-but-null baseElement
  if (arguments.length === 2 && !baseElement) {
    return undefined
  }

  // @ts-ignore
  const all = (baseElement ?? document).querySelectorAll<TElement>(
    String(selectors),
  )
  return all[all.length - 1]
}

/**
 * @param selectors      One or more CSS selectors separated by commas
 * @param [baseElement]  The element to look inside of
 * @return               Whether it's been found
 */
function selectElementExists(
  selectors: string | string[],
  baseElement?: ParentNode,
): boolean {
  // Shortcut with specified-but-null baseElement
  if (arguments.length === 2 && !baseElement) {
    return false
  }

  return Boolean((baseElement ?? document).querySelector(String(selectors)))
}

/**
 * @param selectors       One or more CSS selectors separated by commas
 * @param [baseElements]  The element or list of elements to look inside of
 * @return                An array of elements found
 */
function selectElementAll<
  Selector extends string,
  TElement extends Element = ParseSelector<Selector, HTMLElement>,
>(selectors: Selector | Selector[], baseElements?: BaseElements): TElement[]
function selectElementAll<TElement extends Element = HTMLElement>(
  selectors: string | string[],
  baseElements?: BaseElements,
): TElement[]
function selectElementAll<TElement extends Element>(
  selectors: string | string[],
  baseElements?: BaseElements,
): TElement[] {
  // Shortcut with specified-but-null baseElements
  if (arguments.length === 2 && !baseElements) {
    return []
  }

  // Can be: select.all('selectors') or select.all('selectors', singleElementOrDocument)
  if (!baseElements || isQueryable(baseElements)) {
    // @ts-ignore
    const elements = (baseElements ?? document).querySelectorAll<TElement>(
      String(selectors),
    )
    return toArray(elements)
  }

  const queried: TElement[] = []
  for (const baseElement of baseElements) {
    for (const element of toArray(
      baseElement.querySelectorAll<TElement>(String(selectors)),
    )) {
      queried.push(element)
    }
  }

  return uniq(queried)
}

export {
  selectElement,
  selectElementLast,
  selectElementExists,
  selectElementAll,
}
