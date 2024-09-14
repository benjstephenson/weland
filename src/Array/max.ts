import { Order } from ".."
import { dual } from "../functions"
import { NonEmptyArray } from "./types"

/**
 * Given an Ord instance for A, get the max element
 *
 * @example
 * import \{ Arr, Ord \} from "weland"
 *
 * Arr.max([1, 2, 10, 8, 3], Ord.number) === 10
 */
export const max: {
    <A>(self: NonEmptyArray<A>, ord: Order.Order<A>): A
    <A>(ord: Order.Order<A>): (self: NonEmptyArray<A>) => A
} = dual(2, <A>(self: NonEmptyArray<A>, ord: Order.Order<A>): A => {
    const [x, ...xs] = self
    let _max = x

    for (let i = 0; i < xs.length; i++) {
        _max = ord.greaterThan(_max, xs[i]) ? _max : xs[i]
    }

    return _max
})
