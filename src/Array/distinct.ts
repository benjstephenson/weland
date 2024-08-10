import * as Eq from "../Order/Equal"
import { dual } from "../functions"

/** Given an Equal instance for A, return an array of distinct elements.
 * Array elements are copied by reference.
 *
 * @example
 * import \{ Arr, Eq \} from "weland"
 *
 * Arr.distinct([1, 1, 2, 3, 2, 1], Eq.number) === [1, 2, 3]
 */
export const distinct: {
    <A>(self: A[], eq: Eq.Equal<A>): A[]
    <A>(eq: Eq.Equal<A>): (self: A[]) => A[]
} = dual(2, <A>(self: A[], eq: Eq.Equal<A>): A[] => {
    let out: A[] = []

    for (let i = 0; i < self.length; i++) {
        const item = self[i]

        let seen = false
        for (let j = 0; j < out.length; j++) {
            if (eq.equals(item, out[j]) === true) {
                seen = true
                break
            }
        }

        if (seen === false) out.push(item)
    }

    return out
})
