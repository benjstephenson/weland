import { HKT } from "../typeclass/hkt"
import { Semigroup } from "../typeclass/semigroup"

export interface SemigroupF extends HKT {
    readonly type: Semigroup<this["A"]>
}

export const from = <A>(concat: (x: A, y: A) => A): Semigroup<A> => ({
    concat
})

export const reverse = <A>(S: Semigroup<A>): Semigroup<A> => ({
    concat: (x, y) => S.concat(y, x)
})

export const left = <A>(): Semigroup<A> => ({
    concat: (a, _) => a
})

export const right = <A>(): Semigroup<A> => ({
    concat: (_, b) => b
})

export const number: Semigroup<number> = {
    concat: (a, b) => a + b
}

export const string: Semigroup<string> = {
    concat: (a, b) => `${a}${b}`
}

export const boolean: Semigroup<boolean> = {
    concat: (a, b) => a && b
}

export const array = <A>(): Semigroup<A[]> => ({
    concat: (a, b) => [...a, ...b]
})
