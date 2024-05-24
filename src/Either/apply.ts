import { Either } from "."
import { map, flatMap } from "./map"
import { dual } from "../functions"

const apply: {
    <A, B, E = never>(self: Either<A, E>, fab: Either<(a: A) => B, E>): Either<B, E>
    <A, B, E = never>(fab: Either<(a: A) => B, E>): (self: Either<A, E>) => Either<B, E>
} = dual(2, <A, B, E>(self: Either<A, E>, fab: Either<(a: A) => B, E>): Either<B, E> => {
    return flatMap(self, s => map(fab, f => f(s)))
})

export { apply }
