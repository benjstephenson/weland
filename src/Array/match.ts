import { dual } from "../functions";
import { isNonEmpty } from "./instance";
import { NonEmptyArray } from "./types";

export const match: {
    <A, B>(self: A[], fns: {
        empty: () => B,
        single?: (a: A) => B,
        nonEmpty: (a: NonEmptyArray<A>) => B
    }): B
    <A, B>(fns: {
        empty: () => B,
        single?: (a: A) => B,
        nonEmpty: (a: NonEmptyArray<A>) => B
    }): (self: A[]) => B

} = dual(2, <A, B>(self: A[], fns: {
    empty: () => B,
    single?: (a: A) => B,
    nonEmpty: (a: NonEmptyArray<A>) => B
}) => {

    if (isNonEmpty(self)) {
        if (self.length === 1 && fns["single"]) return fns["single"](self[0])
        return fns.nonEmpty(self)
    }

    return fns.empty()
})
