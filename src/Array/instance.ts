import { map, flatMap, apply, tuple, fold, NonEmptyArray, zipWith, unfold } from "."
import { sequence, traverse } from "./traverse"
import { HKT } from "../typeclass/hkt"
import { Monad } from "../typeclass/monad"
import { Traversable } from "../typeclass/traversable"
import { Semigroup } from "../typeclass/semigroup"
import { fromMonoid } from "../typeclass/foldable"
import { Monoid } from "../typeclass/monoid"
import { Unfoldable } from "../typeclass/unfoldable"

interface ArrayF extends HKT {
    readonly type: Array<this["A"]>
}

const isEmpty = <A>(a: A[]): a is [] => a.length < 1

const isNonEmpty = <A>(a: A[]): a is NonEmptyArray<A> => a.length > 0

const ArrayM: Monad<ArrayF> & Traversable<ArrayF> & Unfoldable<ArrayF> = {
    flatMap,
    of: tuple,
    apply,
    map,
    sequence,
    traverse,
    fold,
    unfold
}

const getSemigroup = <A>(S: Semigroup<A>): Semigroup<A[]> => ({
    concat: (x, y) => zipWith(x, y, S.concat)
})

const getFold = <A>(M: Monoid<A>) => fromMonoid(M, ArrayM)

export { ArrayF, ArrayM, isEmpty, isNonEmpty, getSemigroup, getFold }
