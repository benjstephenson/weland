import { dual } from "../functions"
import { isDefined } from "../predicates"

/**
 * Combine each array element into a single result, using the given function.
 * An initial value is used as the starting value and is returned if the array is empty.
 *
 * @example
 * import \{ Arr \} from "weland"
 *
 * const nums = [1, 2, 3, 4, 5]
 * Arr.fold(nums, 0, (a, b) => a + b) === 15
 * Arr.fold([], 0, (a, b) => a + b) === 0
 */
export const fold: {
    <A, B>(self: A[], init: B, f: (acc: B, val: A) => B): B
    <A, B>(init: B, f: (acc: B, val: A) => B): (self: A[]) => B
} = dual(3, <A, B>(self: A[], init: B, f: (acc: B, val: A) => B): B => {
    return self.reduce(f, init)
})

/**
 * Produce an array from a starting value, using the given function.
 * The function should return a tuple with the first value to be included in the output array
 * and the second value will be the input value to the next invocation.
 * Returning `undefined` indicates that the iteration should terminate.
 *
 * @example
 * import \{ Arr \} from "weland"
 *
 * Arr.unfold(10, n => n > 50 ? undefined : [n, n + 10]) === [10, 20, 30, 40, 50]
 */
export const unfold = <A, B>(init: B, f: (b: B) => [A, B] | undefined): A[] => {
    const out: Array<A> = []
    let next: B = init
    let o: [A, B] | undefined
    while (isDefined((o = f(next)))) {
        const [a, b] = o
        out.push(a)
        next = b
    }
    return out
}
