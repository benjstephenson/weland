import { HKT, Kind, Typeclass } from "./hkt"

export interface Functor<F extends HKT> extends Typeclass<F> {
    readonly map: {
        <A, B, E = never, R = never>(self: Kind<F, A, E, R>, f: (a: A) => B): Kind<F, B, E, R>
        <A, B, E = never, R = never>(f: (a: A) => B): (self: Kind<F, A, E, R>) => Kind<F, B, E, R>
    }
}
