import { dual } from "../functions"
import { isEmpty, isNonEmpty } from "./instance"
import { split } from "./split"

export const slide: {
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
