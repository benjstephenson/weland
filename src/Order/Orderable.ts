import * as Eq from "./Equal"

export type LessThan = -1
export type EqualTo = 0
export type GreaterThan = 1
export type Ordering = LessThan | EqualTo | GreaterThan
export const LessThan: LessThan = -1
export const EqualTo: EqualTo = 0
export const GreaterThan: GreaterThan = 1

export interface Order<A> extends Eq.Equal<A> {
    compare: (x: A, y: A) => Ordering
    lessThan: (x: A, y: A) => boolean
    greaterThan: (x: A, y: A) => boolean
}

export const from = <A>(compare: (x: A, y: A) => Ordering): Order<A> => ({
    equals: (x, y) => compare(x, y) === EqualTo,
    compare,
    lessThan: (x: A, y: A) => compare(x, y) === LessThan,
    greaterThan: (x: A, y: A) => compare(x, y) === GreaterThan
})

const primitive = <A>(x: A, y: A): Ordering => (x < y ? LessThan : x > y ? GreaterThan : EqualTo)

export const contramap = <A, B>(f: (b: B) => A, ord: Order<A>): Order<B> => from((x: B, y: B) => ord.compare(f(x), f(y)))

export const number: Order<number> = from(primitive)
export const string: Order<string> = from(primitive)
export const boolean: Order<boolean> = from(primitive)
export const date: Order<Date> = contramap(d => d.valueOf(), number)
