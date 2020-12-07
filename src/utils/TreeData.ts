import { castArray, cloneDeep } from 'lodash-uni'
import { Merge, OneOrMore } from '../types'

export interface TreeDataNode extends Record<any, any> {}

export type TreeDataSingleRootData<TNode extends TreeDataNode> = TNode

export type TreeDataMultipleRootData<TNode extends TreeDataNode> = TNode[]

export type TreeDataData<TNode extends TreeDataNode> = TNode[]

export type TreeDataChildrenPropName<TNode extends TreeDataNode> = {
  [K in keyof TNode]: TNode[K] extends TreeDataData<TNode> ? K : never
}[keyof TNode]

export type TreeDataSearchMethod = 'DFS' | 'BFS'

export interface TreeDataOptions<TNode extends TreeDataNode> {
  /**
   * 节点上子树数据所在的属性名。
   *
   * @default 'children'
   */
  childrenPropName?: TreeDataChildrenPropName<TNode>

  /**
   * 遍历时的搜索方式。
   *
   * - `DFS`: 深度优先搜索
   * - `BFS`: 广度优先搜索
   *
   * @default 'DFS'
   */
  searchMethod?: TreeDataSearchMethod
}

export interface TreeDataTraverseFnPayload<TNode extends TreeDataNode> {
  /**
   * 当前节点。
   */
  node: TNode

  /**
   * 当前深度。从 `0` 开始。
   */
  depth: number

  /**
   * 父节点。为 `undefined` 时表示当前节点是根节点。
   */
  parentNode: TNode | undefined

  /**
   * 移除当前节点。
   */
  removeNode: () => void
}

export type TreeDataTraverseFn<TNode extends TreeDataNode> = (
  payload: TreeDataTraverseFnPayload<TNode>,
) => void

/**
 * 树数据处理。支持单根节点、多根节点树数据。
 */
export class TreeData<TNode extends TreeDataNode> {
  private data: TreeDataData<TNode>

  private childrenPropName: TreeDataChildrenPropName<TNode>

  private searchMethod: TreeDataSearchMethod

  /**
   * 构造函数。
   *
   * @param data 整棵树的数据
   * @param options 选项
   */
  constructor(
    data: TreeDataSingleRootData<TNode> | TreeDataMultipleRootData<TNode>,
    options: TreeDataOptions<TNode> = {},
  ) {
    this.data = cloneDeep(Array.isArray(data) ? data : [data])
    this.childrenPropName = options?.childrenPropName || ('children' as any)
    this.searchMethod = options?.searchMethod || 'DFS'
  }

  /**
   * 核心遍历函数。
   */
  private static traverse<TNode extends TreeDataNode>(
    data: TreeDataData<TNode>,
    childrenPropName: TreeDataChildrenPropName<TNode>,
    parentNode: TNode | undefined,
    fn: TreeDataTraverseFn<TNode>,
    searchMethod: TreeDataSearchMethod,
    depth: number,
  ) {
    if (searchMethod === 'DFS') {
      for (const node of data) {
        const postActions: Array<() => void> = []
        fn({
          node: node,
          parentNode: parentNode,
          depth: depth,
          removeNode: () =>
            postActions.push(() => data.splice(data.indexOf(node), 1)),
        })
        for (const action of postActions) {
          action()
        }
        if (node[childrenPropName] && Array.isArray(node[childrenPropName])) {
          TreeData.traverse(
            node[childrenPropName],
            childrenPropName,
            node,
            fn,
            searchMethod,
            depth + 1,
          )
        }
      }
    } else {
      for (const node of data) {
        const postActions: Array<() => void> = []
        fn({
          node: node,
          parentNode: parentNode,
          depth: depth,
          removeNode: () =>
            postActions.push(() => data.splice(data.indexOf(node), 1)),
        })
        for (const action of postActions) {
          action()
        }
      }
      for (const node of data) {
        if (node[childrenPropName] && Array.isArray(node[childrenPropName])) {
          TreeData.traverse(
            node[childrenPropName],
            childrenPropName,
            node,
            fn,
            searchMethod,
            depth + 1,
          )
        }
      }
    }
  }

  /**
   * 遍历。
   *
   * @param fn 遍历函数
   * @param searchMethod 遍历搜索方式，默认为选项中的遍历搜索方式
   */
  traverse(
    fn: OneOrMore<TreeDataTraverseFn<TNode> | false>,
    searchMethod: TreeDataSearchMethod = this.searchMethod,
  ): this {
    const fns: Array<TreeDataTraverseFn<TNode>> = castArray(fn).filter(
      fn => typeof fn === 'function',
    ) as any
    for (const fn of fns) {
      TreeData.traverse<TNode>(
        this.data,
        this.childrenPropName,
        undefined,
        fn,
        searchMethod,
        0,
      )
    }
    return this
  }

  /**
   * 深度优先遍历。
   *
   * @param fn 遍历函数
   */
  traverseDFS(fn: OneOrMore<TreeDataTraverseFn<TNode> | false>): this {
    return this.traverse(fn, 'DFS')
  }

  /**
   * 广度优先遍历。
   *
   * @param fn 遍历函数
   */
  traverseBFS(fn: OneOrMore<TreeDataTraverseFn<TNode> | false>): this {
    return this.traverse(fn, 'BFS')
  }

  /**
   * 设置数据深度。从 `0` 开始，将会移除超过指定深度的数据。
   *
   * @param depth 深度
   */
  setDepth(depth: number): this {
    this.traverse(payload => {
      if (payload.depth === depth) {
        delete payload.node[this.childrenPropName]
      }
    })
    return this
  }

  /**
   * 设置节点属性。
   *
   * @param props 节点属性键值映射对象，值为函数，用其返回值作为新的属性值
   */
  setNodeProps<
    TProps extends {
      [K in keyof TNode]?: (node: TNode) => any
    } & {
      [K: string]: (node: TNode) => any
    }
  >(
    props: TProps,
  ): TreeData<
    Merge<
      TNode,
      {
        [K in keyof TProps]: ReturnType<TProps[K]>
      }
    >
  > {
    this.traverse(payload => {
      for (const propName of Object.keys(props)) {
        ;(payload.node as any)[propName] = props[propName](payload.node)
      }
    })
    return this as any
  }

  /**
   * 移除节点上指定的属性。
   *
   * @param propNames 属性名列表
   */
  omitNodeProps<TPropName extends keyof TNode>(
    propNames: TPropName[],
  ): TreeData<Omit<TNode, TPropName>> {
    this.traverse(payload => {
      for (const propName of propNames) {
        delete payload.node[propName]
      }
    })
    return this as any
  }

  /**
   * 选取节点上指定的属性。
   *
   * @param propNames 属性名列表
   */
  pickNodeProps<TPropName extends keyof TNode>(
    propNames: TPropName[],
  ): TreeData<Pick<TNode, TPropName>> {
    this.traverse(payload => {
      for (const propName of Object.keys(payload.node)) {
        if (propNames.indexOf(propName as any) === -1) {
          delete payload.node[propName]
        }
      }
    })
    return this as any
  }

  /**
   * 导出数据。
   */
  export(): TreeDataData<TNode> {
    return cloneDeep(this.data)
  }
}
