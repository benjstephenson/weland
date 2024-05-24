import { Apply } from "./apply"
import { HKT, Kind } from "./hkt"

export interface Applicative<F extends HKT> extends Apply<F> {
    readonly of: <A, E = never, R = never>(a: A) => Kind<F, A, E, R>
}
