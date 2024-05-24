import { Either, Left, Right } from "."
import { dual } from "../functions"
import { Applicative } from "../typeclass/applicative"
import { HKT } from "../typeclass/hkt"
import { Monad } from "../typeclass/monad"
import { Semigroup } from "../typeclass/semigroup"
import { Traversable } from "../typeclass/traversable"
import { apply } from "./apply"
import { left, right } from "./constructors"
import { fold } from "./fold"
import { flatMap, map } from "./map"
import { sequence, traverse } from "./traverse"

type Simplify<A> = { [K in keyof A]: A[K] } extends infer B ? B : never

type Modify<T, R> = Omit<T, keyof R> & R
type SetE<F extends HKT, E> = Modify<F, { readonly E: E }>

interface EitherF extends HKT {
    readonly type: Either<this["A"], this["E"]>
}

const isLeft = <A, E>(e: Either<A, E>): e is Left<E> => e._tag === "left"
const isRight = <A, E>(e: Either<A, E>): e is Right<A> => e._tag === "right"

const EitherM: Monad<EitherF> & Traversable<EitherF> = {
    of: right,
    flatMap,
    apply,
    map,
    sequence,
    traverse,
    fold
}

const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Either<A>> =>
    ({
        concat: (x, y) => (isLeft(x) ? y : isLeft(y) ? x : right(S.concat(x.value, y.value)))
    }) as const

const getLeftSemigroup = <E>(S: Semigroup<E>): Semigroup<Either<never, E>> =>
    ({
        concat: (x, y) => (isRight(x) ? y : isRight(y) ? x : left(S.concat(x.value, y.value)))
    }) as const

const getValidation = <E>(S: Semigroup<E>): Applicative<SetE<EitherF, E>> => ({
    apply: dual(2, <A, B>(self: Either<A, E>, fab: Either<(a: A) => B, E>): Either<B, E> => {
        return isLeft(self)
            ? isLeft(fab)
                ? left(S.concat(self.value, fab.value))
                : self
            : isLeft(fab)
              ? fab
              : right(fab.value(self.value))
    }),
    of: right,
    map
})

export { EitherM, getLeftSemigroup, getSemigroup, getValidation, isLeft, isRight }
