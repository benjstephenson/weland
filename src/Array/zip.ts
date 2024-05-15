import { dual } from "../functions"
import { tuple } from "./constructors"
import { AnyArray, ArrayElem, InferArrayType } from "./types"

export const zip: {
    <As extends AnyArray, Bs extends AnyArray>(self: As, bs: Bs): InferArrayType<As, [ArrayElem<As>, ArrayElem<Bs>]>
    <Bs extends AnyArray>(bs: Bs): <As extends AnyArray>(self: As) => InferArrayType<As, [ArrayElem<As>, ArrayElem<Bs>]>
} = dual(2, <A, B>(self: A[], bs: B[]): [A, B][] => {
    return zipWith(self, bs, tuple)
})

export const zipWith: {
    <As extends AnyArray, Bs extends AnyArray, Out>(
        self: As,
        bs: Bs,
        f: (a: ArrayElem<As>, b: ArrayElem<Bs>) => Out
    ): InferArrayType<As, Out>
    <As extends AnyArray, Bs extends AnyArray, Out>(
        bs: Bs,
        f: (a: ArrayElem<As>, b: ArrayElem<Bs>) => Out
    ): (self: As) => InferArrayType<As, Out>
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
