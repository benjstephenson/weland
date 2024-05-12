import { Either } from "."
import { dual } from "../functions"
import { isLeft } from "./instance"

export const fold: {
    <A, B, E>(self: Either<A, E>, init: B, f: (acc: B, val: A) => B): B
    <A, B, E>(init: B, f: (acc: B, val: A) => B): (self: Either<A, E>) => B
} = dual(
    3,
    <A, B, E>(self: Either<A, E>, init: B, f: (acc: B, val: A) => B): B => (isLeft(self) ? init : f(init, self.value))
)

export const foldRight: {
    <A, B, E>(self: Either<A, E>, init: B, f: (acc: A, val: B) => B): B
    <A, B, E>(init: B, f: (acc: A, val: B) => B): (self: Either<A, E>) => B
} = dual(
    3,
    <A, B, E>(self: Either<A, E>, init: B, f: (acc: A, val: B) => B): B => (isLeft(self) ? init : f(self.value, init))
)
