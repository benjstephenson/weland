import * as Eq from "./Equal"

export type LessThan = -1
export type EqualTo = 0
export type GreaterThan = 1
export type Ordering = LessThan | EqualTo | GreaterThan
export const LessThan: LessThan = -1
export const EqualTo: EqualTo = 0
export const GreaterThan: GreaterThan = 1

export interface Ord<A> extends Eq.Equal<A> {
    compare: (x: A, y: A) => Ordering
    lessThan: (x: A, y: A) => boolean
    equalTo: (x: A, y: A) => boolean
    greaterThan: (x: A, y: A) => boolean
}

export const from = <A>(compare: (x: A, y: A) => Ordering): Ord<A> => ({
    equals: (x, y) => compare(x, y) === EqualTo,
    compare,
    lessThan: (x: A, y: A) => compare(x, y) === LessThan,
    equalTo: (x: A, y: A) => compare(x, y) === EqualTo,
    greaterThan: (x: A, y: A) => compare(x, y) === GreaterThan
})

const primitive = <A>(x: A, y: A): Ordering => (x < y ? LessThan : x > y ? GreaterThan : EqualTo)

export const contramap = <A, B>(f: (b: B) => A, ord: Ord<A>): Ord<B> => from((x: B, y: B) => ord.compare(f(x), f(y)))

export const number: Ord<number> = from(primitive)
export const string: Ord<string> = from(primitive)
export const boolean: Ord<boolean> = from(primitive)
export const date: Ord<Date> = contramap(d => d.valueOf(), number)
