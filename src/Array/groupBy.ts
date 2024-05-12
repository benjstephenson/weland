import { NonEmptyArray } from "."
import { dual } from "../functions"
import { headNonEmpty } from "./destructors"
import { isNonEmpty } from "./instance"

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

export { groupBy }
