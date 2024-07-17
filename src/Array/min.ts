import { Ord } from ".."
import { dual } from "../functions"
import { NonEmptyArray } from "./types"

/**
 * Given an Ord instance for A, get the min element
 *
 * @example
 * import \{ Arr, Ord \} from "weland"
 *
 * Arr.max([1, 2, 10, 8, 3], Ord.number) === 1
 */
export const min: {
    <A>(self: NonEmptyArray<A>, ord: Ord.Ord<A>): A
    <A>(ord: Ord.Ord<A>): (self: NonEmptyArray<A>) => A
} = dual(2, <A>(self: NonEmptyArray<A>, ord: Ord.Ord<A>): A => {
    const [x, ...xs] = self
    let _min = x

    for (let i = 0; i < xs.length; i++) {
        _min = ord.lessThan(_min, xs[i]) ? _min : xs[i]
    }

    return _min
})
