import { dual } from "../functions"
import { Applicative } from "../typeclass/applicative"
import { HKT, Kind } from "../typeclass/hkt"
import { tuple } from "./constructors"

export const sequence =
    <G extends HKT>(G: Applicative<G>) =>
    <A, E, R>(fa: Kind<G, A, E, R>[]): Kind<G, A[], E, R> =>
        traverse(G)(fa, x => x)

export const traverse = <G extends HKT>(
    G: Applicative<G>
): {
    <A, B, E, R>(self: A[], f: (a: A) => Kind<G, B, E, R>): Kind<G, B[], E, R>
    <A, B, E, R>(f: (a: A) => Kind<G, B, E, R>): (self: A[]) => Kind<G, B[], E, R>
} =>
    dual(
        2,
        <A, B, E, R>(self: A[], f: (a: A) => Kind<G, B, E, R>): Kind<G, B[], E, R> =>
            self.reduce(
                (acc, val) =>
                    G.apply(
                        f(val),
                        G.map(acc, bs => (b: B) => [...bs, b])
                    ),
                G.of<B[], E, R>(tuple())
            )
    )
