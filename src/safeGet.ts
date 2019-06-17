import { AnyObject } from './enhanceType'
import { isNil } from './is'

export function safeGet<
  T extends AnyObject,
  K0 extends keyof T,
>(obj: T, k0: K0): T[K0]

export function safeGet<
  T extends AnyObject,
  K0 extends keyof T,
  K1 extends keyof T[K0],
>(obj: T, k0: K0, k1: K1): T[K0][K1]

export function safeGet<
  T extends AnyObject,
  K0 extends keyof T,
  K1 extends keyof T[K0],
  K2 extends keyof T[K0][K1],
>(obj: T, k0: K0, k1: K1, k2: K2): T[K0][K1][K2]

export function safeGet<
  T extends AnyObject,
  K0 extends keyof T,
  K1 extends keyof T[K0],
  K2 extends keyof T[K0][K1],
  K3 extends keyof T[K0][K1][K2],
>(obj: T, k0: K0, k1: K1, k2: K2, k3: K3): T[K0][K1][K2][K3]

export function safeGet<
  T extends AnyObject,
  K0 extends keyof T,
  K1 extends keyof T[K0],
  K2 extends keyof T[K0][K1],
  K3 extends keyof T[K0][K1][K2],
  K4 extends keyof T[K0][K1][K2][K3],
>(obj: T, k0: K0, k1: K1, k2: K2, k3: K3, k4: K4): T[K0][K1][K2][K3][K4]

export function safeGet<
  T extends AnyObject,
  K0 extends keyof T,
  K1 extends keyof T[K0],
  K2 extends keyof T[K0][K1],
  K3 extends keyof T[K0][K1][K2],
  K4 extends keyof T[K0][K1][K2][K3],
  K5 extends keyof T[K0][K1][K2][K3][K4],
>(obj: T, k0: K0, k1: K1, k2: K2, k3: K3, k4: K4, k5: K5): T[K0][K1][K2][K3][K4][K5]

export function safeGet<
  T extends AnyObject,
  K0 extends keyof T,
  K1 extends keyof T[K0],
  K2 extends keyof T[K0][K1],
  K3 extends keyof T[K0][K1][K2],
  K4 extends keyof T[K0][K1][K2][K3],
  K5 extends keyof T[K0][K1][K2][K3][K4],
  K6 extends keyof T[K0][K1][K2][K3][K4][K5],
>(obj: T, k0: K0, k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6): T[K0][K1][K2][K3][K4][K5][K6]

export function safeGet<
  T extends AnyObject,
  K0 extends keyof T,
  K1 extends keyof T[K0],
  K2 extends keyof T[K0][K1],
  K3 extends keyof T[K0][K1][K2],
  K4 extends keyof T[K0][K1][K2][K3],
  K5 extends keyof T[K0][K1][K2][K3][K4],
  K6 extends keyof T[K0][K1][K2][K3][K4][K5],
  K7 extends keyof T[K0][K1][K2][K3][K4][K5][K6],
>(obj: T, k0: K0, k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6, k7: K7): T[K0][K1][K2][K3][K4][K5][K6][K7]

export function safeGet<
  T extends AnyObject,
  K0 extends keyof T,
  K1 extends keyof T[K0],
  K2 extends keyof T[K0][K1],
  K3 extends keyof T[K0][K1][K2],
  K4 extends keyof T[K0][K1][K2][K3],
  K5 extends keyof T[K0][K1][K2][K3][K4],
  K6 extends keyof T[K0][K1][K2][K3][K4][K5],
  K7 extends keyof T[K0][K1][K2][K3][K4][K5][K6],
  K8 extends keyof T[K0][K1][K2][K3][K4][K5][K6][K7],
>(obj: T, k0: K0, k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6, k7: K7, k8: K8): T[K0][K1][K2][K3][K4][K5][K6][K7][K8]

export function safeGet<
  T extends AnyObject,
  K0 extends keyof T,
  K1 extends keyof T[K0],
  K2 extends keyof T[K0][K1],
  K3 extends keyof T[K0][K1][K2],
  K4 extends keyof T[K0][K1][K2][K3],
  K5 extends keyof T[K0][K1][K2][K3][K4],
  K6 extends keyof T[K0][K1][K2][K3][K4][K5],
  K7 extends keyof T[K0][K1][K2][K3][K4][K5][K6],
  K8 extends keyof T[K0][K1][K2][K3][K4][K5][K6][K7],
  K9 extends keyof T[K0][K1][K2][K3][K4][K5][K6][K7][K8],
>(obj: T, k0: K0, k1: K1, k2: K2, k3: K3, k4: K4, k5: K5, k6: K6, k7: K7, k8: K8, k9: K9): T[K0][K1][K2][K3][K4][K5][K6][K7][K8][K9]

export function safeGet(obj: AnyObject, ...path: any[]): any {
  let last: any = obj
  const end = path.length - 1
  for (let i = 0; i < end; i++) {
    last = last[path[i]]
    if (isNil(last)) {
      last = undefined
      break
    }
  }
  return isNil(last) ? last : last[path[end]]
}
