import { Either } from "."
import { ArrayM } from "../Array/instance"
import { dual } from "../functions"
import { Applicative } from "../typeclass/applicative"
import { HKT, Kind } from "../typeclass/hkt"
import { right } from "./constructors"
import { EitherM, isLeft } from "./instance"

export const forEach = <A, B, E>(self: A[], f: (a: A) => Either<B, E>): Either<B[], E> =>
    ArrayM.traverse(EitherM)(self, f)

export const sequence =
    <G extends HKT>(G: Applicative<G>) =>
    <A, E, R>(fa: Either<Kind<G, A, E, R>, E>): Kind<G, Either<A, E>, E, R> =>
        traverse(G)(fa, x => x)

export const traverse = <G extends HKT>(
    G: Applicative<G>
): {
    <A, B, E, R>(self: Either<A, E>, f: (a: A) => Kind<G, B, E, R>): Kind<G, Either<B, E>, E, R>
    <A, B, E, R>(f: (a: A) => Kind<G, B, E, R>): (self: Either<A, E>) => Kind<G, Either<B, E>, E, R>
} =>
    dual(
        2,
        <A, B, E, R>(self: Either<A, E>, f: (a: A) => Kind<G, B, E, R>): Kind<G, Either<B, E>, E, R> =>
            isLeft(self) ? G.of(self) : G.map(f(self.value), right)
    )
