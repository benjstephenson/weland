import { dual } from "../functions"

/** Given an array, create a window of size N and slide over the array in a step of N, using that window and apply a
 * function to it and accumulate the results.
 * The last window may be smaller than the requested size if the input array isn't completely consumed by the previous window
 * and the last element wasn't skipped by the previous step.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5]
 * slide(numbers, {size: 2, step: 1}) === [[1, 2], [2, 3], [3, 4], [4, 5], [5]]
 *
 * slide(numbers, {size: 3, step: 3}) === [[1, 2, 3], [4, 5]]
 *
 * slide(numbers, {size: 3, step: 2}) === [[1, 2, 3], [3, 4, 5]]
 */
export const slideWith: {
    <A>(self: A[], window: {size: number, step: number}): A[][],
    <A>(window: {size: number, step: number}): (self: A[]) => A[][]
} = dual(2, <A>(self: A[], window: {size: number, step: number}): A[][] => {
    const out: A[][] = []
    for (let i = 0; i < self.length; i += window.step) {
        out.push(self.slice(i, i + window.size))
    }

    return out
})

/** Given an array, create a window of size N and slide over the array in a step of 1, using that window and apply a
 * function to it and accumulate the results.
 * The last window may be smaller than the requested size if the input array isn't completely consumed by the previous window
 * and the last element wasn't skipped by the previous step.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5]
 * slide(numbers, size: 2) === [[1, 2], [2, 3], [3, 4], [4, 5], [5]]
 * slide(numbers, size: 3) === [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5]]
 */
export const slide: {
    <A>(self: A[], size: number): A[][],
    <A>(size: number): (self: A[]) => A[][]
} = dual(2, <A>(self: A[], size: number): A[][] => slideWith(self, {size, step: 1}))