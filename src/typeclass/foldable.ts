import { HKT, Kind, Typeclass } from "./hkt"
import { Monoid } from "./monoid"

export interface Foldable<F extends HKT> extends Typeclass<F> {
    readonly fold: {
        <A, B, E, R>(self: Kind<F, A, E, R>, init: B, f: (acc: B, a: A) => B): B
        <A, B, E, R>(init: B, f: (acc: B, a: A) => B): (self: Kind<F, A, E, R>) => B
    }
}

export const fromMonoid =
    <F extends HKT, A, E, R>(M: Monoid<A>, F: Foldable<F>) =>
    (self: Kind<F, A, E, R>) =>
        F.fold(self, M.empty, M.concat)
