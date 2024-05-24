import { Functor } from "./functor"
import { HKT, Kind } from "./hkt"

export interface Apply<F extends HKT> extends Functor<F> {
    readonly apply: {
        <A, B, E = never, E2 = never, R = never, R2 = never>(
            self: Kind<F, A, E, R>,
            fab: Kind<F, (a: A) => B, E2, R2>
        ): Kind<F, B, E | E2, R & R2>
        <A, B, E = never, E2 = never, R = never, R2 = never>(
            fab: Kind<F, (a: A) => B, E2, R2>
        ): (self: Kind<F, A, E, R>) => Kind<F, B, E | E2, R & R2>
    }
}
