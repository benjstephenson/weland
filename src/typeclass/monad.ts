import { Applicative } from "./applicative"
import { HKT, Kind } from "./hkt"

export interface Monad<F extends HKT> extends Applicative<F> {
    readonly flatMap: {
        <A, B, E, R>(self: Kind<F, A, E, R>, f: (a: A) => Kind<F, B, E, R>): Kind<F, B, E, R>
        <A, B, E, R>(f: (a: A) => Kind<F, B, E, R>): (self: Kind<F, A, E, R>) => Kind<F, B, E, R>
    }
}
