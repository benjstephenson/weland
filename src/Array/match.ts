import { dual } from "../functions"
import { isEmpty } from "./instance"

export const match: {
    <A, B>(self: A[], fns: { nonEmpty: (a: A[]) => B; empty: () => B })
    <A, B>(fns: { nonEmpty: (a: A[]) => B; empty: () => B }): (self: A[]) => B
} = dual(2, <A, B>(self: A[], fns: { nonEmpty: (a: A[]) => B; empty: () => B }) =>
    isEmpty(self) ? fns.empty() : fns.nonEmpty(self)
)
