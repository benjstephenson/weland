import { Option, isSome } from "."
import { Either } from "../Either"
import { left, right } from "../Either/constructors"
import { dual } from "../functions"

export const toEither: {
    <A, E>(self: Option<A>, onNone: () => E): Either<A, E>
    <E>(onNone: () => E): <A>(self: Option<A>) => Either<A, E>
} = dual(
    2,
    <A, E>(self: Option<A>, onNone: () => E): Either<A, E> => (isSome(self) ? right(self.value) : left(onNone()))
)

export const toArray = <A>(self: Option<A>): A[] => (isSome(self) ? [self.value] : [])
