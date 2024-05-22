export declare const URI: unique symbol

export interface Typeclass<F extends HKT> {
    readonly [URI]?: F
}

export interface HKT {
    readonly A: unknown
    readonly E: unknown
    readonly R: unknown
    readonly type: unknown
}

export type Kind<F extends HKT, A, E = never, R = never> = F extends { readonly type: unknown }
    ? (F & {
          readonly R: R
          readonly E: E
          readonly A: A
      })["type"]
    : {
          readonly _F: F
          readonly _A: () => A
          readonly _E: () => E
          readonly _R: (_: R) => void
      }

export const unsafeWidenFA = <F extends HKT, A, A2, E, R>(self: Kind<F, A, E, R>): Kind<F, A2, E, R> => self as any
