import { NonEmptyArray } from "./types"
export const of = <A>(a: A): NonEmptyArray<A> => [a]

export const make = <A extends NonEmptyArray<any>>(...as: A): NonEmptyArray<A[number]> => as

export function tuple<T extends ReadonlyArray<any>>(...t: T) {
    return t
}
