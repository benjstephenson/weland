import { HKT, Kind, Typeclass } from "./hkt"

export interface Unfoldable<F extends HKT> extends Typeclass<F> {
    readonly unfold: {
        <A, B, E = never, R = never>(init: B, f: (b: B) => [A, B] | undefined): Kind<F, A, E, R> 
    }
}
