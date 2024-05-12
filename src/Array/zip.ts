import { dual } from "../functions"
import { tuple } from "./constructors"

export const zip: {
    <A, B>(self: A[], bs: B[]): [A, B][]
    <B>(bs: B[]): <A>(self: A[]) => [A, B][]
} = dual(2, <A, B>(self: A[], bs: B[]): [A, B][] => {
    return zipWith(self, bs, tuple)
})

export const zipWith: {
    <A, B, Out>(self: A[], bs: B[], f: (a: A, b: B) => Out): Out[]
    <A, B, Out>(bs: B[], f: (a: A, b: B) => Out): (self: A[]) => Out[]
} = dual(3, <A, B, Out>(self: A[], bs: B[], f: (a: A, b: B) => Out): Out[] => {
    const len = Math.min(self.length, bs.length)

    const out: Out[] = Array<Out>(len)
    for (let i = 0; i < len; i++) {
        out[i] = f(self[i], bs[i])
    }

    return out
})

export const unzip = <A, B>(self: [A, B][]): [A[], B[]] => {
    const as = Array(self.length)
    const bs = Array(self.length)

    for (let i = 0; i < self.length; i++) {
        const [a, b] = self[i]
        as[i] = a
        bs[i] = b
    }

    return [as, bs]
}
