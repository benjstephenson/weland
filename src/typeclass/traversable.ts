import { Applicative } from "./applicative"
import { Foldable } from "./foldable"
import { Functor } from "./functor"
import { HKT, Kind } from "./hkt"

export interface Traversable<F extends HKT> extends Foldable<F>, Functor<F> {
    readonly traverse: <G extends HKT>(
        G: Applicative<G>
    ) => {
        <A, B, E = never, R = never>(
            self: Kind<F, A, E, R>,
            f: (a: A) => Kind<G, B, E, R>
        ): Kind<G, Kind<F, B, E, R>, E, R>
        <A, B, E = never, R = never>(
            f: (a: A) => Kind<G, B, E, R>
        ): (self: Kind<F, A, E, R>) => Kind<G, Kind<F, B, E, R>, E, R>
    }

    readonly sequence: <G extends HKT>(
        G: Applicative<G>
    ) => <A, E = never, R = never>(self: Kind<F, Kind<G, A, E, R>, E, R>) => Kind<G, Kind<F, A, E, R>, E, R>
}
