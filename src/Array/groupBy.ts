import { NonEmptyArray } from "."
import { dual } from "../functions"
import { headNonEmpty } from "./destructors"
import { isNonEmpty } from "./instance"

/* Given an f that returns a string | number | symbol, group array entries that share the property
 * returned by f into a record indexed by that value.
 *
 * import \{ Arr \} from "weland"
 * Arr.groupOn([2, 2, 1, 2, 4, 4, 3, 6, 5, 6], identity) === { 1: [1], 2: [2, 2, 2], 3: [3], 4: [4, 4], 5: [5], 6: [6, 6] }
 */
const groupOn: {
    <A, B extends string | number | symbol>(self: NonEmptyArray<A>, f: (a: A) => B): Record<B, NonEmptyArray<A>>
    <A, B extends string | number | symbol>(f: (a:A ) => B): (self: NonEmptyArray<A>) => Record<B, NonEmptyArray<A>>
} = dual(2, <A, B extends string | number | symbol>(self: NonEmptyArray<A>, f: (a: A) => B): Record<B, NonEmptyArray<A>> => {

    const map: Record<B, NonEmptyArray<A>> = {} as any

    for (let i = 0; i < self.length; i++) {
        const key = f(self[i])
        map[key] = map[key] === undefined ? [self[i]] : [...map[key], self[i]]
    }

    return map
})


 /* Given an equivalence function, group items where the function returns true into the same sub-array
 * The input array *must* already be sorted.
 * @deprecated use {@link groupOn} instead to avoid having to pre-sort
 */
const groupBy: {
    <A>(self: NonEmptyArray<A>, areEqual: (a: A, b: A) => boolean): NonEmptyArray<NonEmptyArray<A>>
    <A>(areEqual: (a: A, b: A) => boolean): (self: NonEmptyArray<A>) => NonEmptyArray<NonEmptyArray<A>>
} = dual(2, <A>(self: NonEmptyArray<A>, areEqual: (a: A, b: A) => boolean): NonEmptyArray<NonEmptyArray<A>> => {
    const first = headNonEmpty(self)
    const out: NonEmptyArray<A> = [first]
    let i = 1
    for (; i < self.length; i++) {
        if (areEqual(first, self[i])) {
            out.push(self[i])
        } else {
            break
        }
    }

    const rest = self.slice(i)
    if (!isNonEmpty(rest)) {
        return [out]
    }

    return [out, ...groupBy(rest, areEqual)]
})

export { groupBy, groupOn }
