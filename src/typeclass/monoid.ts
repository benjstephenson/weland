import { Semigroup } from "./semigroup"

export interface Monoid<A> extends Semigroup<A> {
    readonly empty: A
}
