import { Option, none, some } from "."
import { ArrayM } from "../Array/instance"
import { dual } from "../functions"
import { Applicative } from "../typeclass/applicative"
import { HKT, Kind } from "../typeclass/hkt"
import { OptionM } from "./instance"

export const forEach = <A, B>(self: A[], f: (a: A) => Option<B>): Option<B[]> => ArrayM.traverse(OptionM)(self, f)

export const sequence =
    <G extends HKT>(G: Applicative<G>) =>
    <A, E, R>(fa: Option<Kind<G, A, E, R>>): Kind<G, Option<A>, E, R> =>
        traverse(G)(fa, x => x)

export const traverse = <G extends HKT>(
    G: Applicative<G>
): {
    <A, B, E, R>(self: Option<A>, f: (a: A) => Kind<G, B, E, R>): Kind<G, Option<B>, E, R>
    <A, B, E, R>(f: (a: A) => Kind<G, B, E, R>): (self: Option<A>) => Kind<G, Option<B>, E, R>
} =>
    dual(
        2,
        <A, B, E, R>(self: Option<A>, f: (a: A) => Kind<G, B, E, R>): Kind<G, Option<B>, E, R> =>
            self._tag === "none" ? G.of(none()) : G.map(f(self.value), some)
    )
