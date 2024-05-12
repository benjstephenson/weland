import { dual } from "../functions"
import { isDefined } from "../predicates"

export const fold: {
    <A, B>(self: A[], init: B, f: (acc: B, val: A) => B): B
    <A, B>(init: B, f: (acc: B, val: A) => B): (self: A[]) => B
} = dual(3, <A, B>(self: A[], init: B, f: (acc: B, val: A) => B): B => {
    return self.reduce(f, init)
})

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
