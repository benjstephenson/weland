import { Either } from "."
import { dual } from "../functions"
import { isRight } from "./instance"

export const match: {
    <A, B, E>(self: Either<A, E>, fns: { right: (a: A) => B; left: (e: E) => B })
    <A, B, E>(fns: { right: (a: A) => B; left: (e: E) => B }): (self: Either<A, E>) => B
} = dual(2, <A, B, E>(self: Either<A, E>, fns: { right: (a: A) => B; left: (e: E) => B }) =>
    isRight(self) ? fns.right(self.value) : fns.left(self.value)
)
