import { Option, isSome } from "."
import { dual } from "../functions"

export const fold: {
    <A, B>(self: Option<A>, init: B, f: (acc: B, val: A) => B): B
    <A, B>(init: B, f: (acc: B, val: A) => B): (self: Option<A>) => B
} = dual(
    3,
    <A, B>(self: Option<A>, init: B, f: (acc: B, val: A) => B): B => (isSome(self) ? f(init, self.value) : init)
)

export const foldRight: {
    <A, B>(self: Option<A>, init: B, f: (acc: A, val: B) => B): B
    <A, B>(init: B, f: (acc: B, val: B) => A): (self: Option<A>) => B
} = dual(
    3,
    <A, B>(self: Option<A>, init: B, f: (acc: A, val: B) => B): B => (isSome(self) ? f(self.value, init) : init)
)
