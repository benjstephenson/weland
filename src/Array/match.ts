import { dual } from "../functions";
import { isNonEmpty } from "./instance";
import { NonEmptyArray } from "./types";

export const match: {
    <A, B>(self: A[], fns: {
        empty: () => B,
        1?: (a: A) => B,
        nonEmpty: (a: NonEmptyArray<A>) => B
    })
    <A, B>(fns: {
        empty: () => B,
        1?: (a: A) => B,
        nonEmpty: (a: NonEmptyArray<A>) => B
    }): (self: A[]) => B

} = dual(2, <A, B>(self: A[], fns: {
    empty: () => B,
    1?: (a: A) => B,
    nonEmpty: (a: NonEmptyArray<A>) => B
}) => {

    if (isNonEmpty(self)) {
        if (self.length === 1 && fns[1]) return fns[1](self[0])
        return fns.nonEmpty(self)
    }

    return fns.empty()
})
