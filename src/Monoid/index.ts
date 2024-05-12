import { HKT } from "../typeclass/hkt"
import { Monoid } from "../typeclass/monoid"
import * as Sg from "../Semigroup"

export interface MonoidF extends HKT {
    readonly type: Monoid<this["A"]>
}

export const string: Monoid<string> = {
    ...Sg.string,
    empty: ""
}

export const number: Monoid<number> = {
    ...Sg.number,
    empty: 0
}

export const array = <A>(): Monoid<A[]> => ({
    ...Sg.array<A>(),
    empty: [] as A[]
})
