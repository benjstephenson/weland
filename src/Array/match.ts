import { dual } from "../functions";
import { isNonEmpty } from "./instance";
import { NonEmptyArray } from "./types";

export const match: {
    <A, B>(self: A[], fns: { nonEmpty: (a: NonEmptyArray<A>) => B; empty: () => B })
    <A, B>(fns: { nonEmpty: (a: NonEmptyArray<A>) => B; empty: () => B }): (self: A[]) => B
} = dual(2, <A, B>(self: A[], fns: { nonEmpty: (a: NonEmptyArray<A>) => B; empty: () => B }) =>
    isNonEmpty(self) ? fns.nonEmpty(self) : fns.empty()
)
