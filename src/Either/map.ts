import { Either } from "."
import { dual } from "../functions"
import { right } from "./constructors"

const map: {
    <A, B, E = never>(self: Either<A, E>, f: (a: A) => B): Either<B, E>
    <A, B, E = never>(f: (a: A) => B): (self: Either<A, E>) => Either<B, E>
} = dual(2, <A, B, E>(self: Either<A, E>, f: (a: A) => B): Either<B, E> => {
    return self._tag === "right" ? right(f(self.value)) : self
})

const flatMap: {
    <A, B, E>(self: Either<A, E>, f: (a: A) => Either<B, E>): Either<B, E>
    <A, B, E>(f: (a: A) => Either<B, E>): (self: Either<A, E>) => Either<B, E>
} = dual(2, <A, B, E>(self: Either<A, E>, f: (a: A) => Either<B, E>): Either<B, E> => {
    return self._tag === "right" ? f(self.value) : self
})

export { map, flatMap }
