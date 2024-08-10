import { dual } from "../functions"
import { isEmpty, isNonEmpty } from "./instance"
import { split } from "./split"


/**
 * Group an array into N slices. The last group may be less than N if there are
 * not enough items in the source array.
 *
 * @example
 * import \{ Arr \} from "weland"
 *
 * Arr.grouped([1, 2, 10, 8, 3], 2) === [[1, 2], [10, 8], [3]]
 */
export const grouped: {
    (size: number): <A>(self: A[]) => A[][]
    <A>(self: A[], size: number): A[][]
} = dual(2, <A>(self: A[], size: number): A[][] => {
    if (isEmpty(self)) return []

    const [b, rest] = split(self, size)

    const out = [b]
    let next = rest
    while (isNonEmpty(next)) {
        const [b, rest] = split(next, size)
        out.push(b)
        next = rest
    }
    return out
})
