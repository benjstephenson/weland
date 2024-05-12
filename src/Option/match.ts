import { dual } from "../functions"
import { Option } from "."
import { fold } from "./fold"

export const match: {
    <A, B>(self: Option<A>, fns: { some: (a: A) => B; none: () => B })
    <A, B>(fns: { some: (a: A) => B; none: () => B }): (self: Option<A>) => B
} = dual(2, <A, B>(self: Option<A>, fns: { some: (a: A) => B; none: () => B }) =>
    fold(self, fns.none(), (_, v) => fns.some(v))
)
