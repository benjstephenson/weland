import { HKT } from "../typeclass/hkt"
import { Semigroup } from "../typeclass/semigroup"

interface SemigroupF extends HKT {
    readonly type: Semigroup<this["A"]>
}

const from = <A>(concat: (x: A, y: A) => A): Semigroup<A> => ({
    concat
})

const reverse = <A>(S: Semigroup<A>): Semigroup<A> => ({
    concat: (x, y) => S.concat(y, x)
})

const left = <A>(): Semigroup<A> => ({
    concat: (a, _) => a
})

const right = <A>(): Semigroup<A> => ({
    concat: (_, b) => b
})

const number: Semigroup<number> = {
    concat: (a, b) => a + b
}

const string: Semigroup<string> = {
    concat: (a, b) => `${a}${b}`
}

const boolean: Semigroup<boolean> = {
    concat: (a, b) => a && b
}

const array = <A>(): Semigroup<A[]> => ({
    concat: (a, b) => [...a, ...b]
})

export { Semigroup, SemigroupF, from, reverse, left, right, number, string, boolean, array }
