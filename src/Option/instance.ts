import { None, Option, Some } from "../Option"
import { HKT } from "../typeclass/hkt"
import { Monad } from "../typeclass/monad"
import { Traversable } from "../typeclass/traversable"
import { of, some } from "./constructors"
import { apply } from "./apply"
import { fold } from "./fold"
import { map, flatMap } from "./map"
import { sequence, traverse } from "./traverse"
import { Semigroup } from "../typeclass/semigroup"

interface OptionF extends HKT {
    readonly type: Option<this["A"]>
}

const isSome = <A>(a: Option<A>): a is Some<A> => a._tag === "some"
const isNone = <A>(a: Option<A>): a is None => a._tag === "none"

const OptionM: Monad<OptionF> & Traversable<OptionF> = {
    of,
    flatMap,
    apply,
    map,
    sequence,
    traverse,
    fold
} as const

const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Option<A>> =>
    ({
        concat: (x, y) => (isNone(x) ? y : isNone(y) ? x : some(S.concat(x.value, y.value)))
    }) as const

export { OptionF, OptionM, isSome, isNone, getSemigroup }
