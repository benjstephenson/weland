import { dual, pipe } from "../functions"
import { Applicative } from "../typeclass/applicative"
import { HKT, Kind } from "../typeclass/hkt"
import { flatMap, map } from "./map"
import { sequence } from "./traverse"

const apply: {
    <A, B>(self: A[], fab: ((a: A) => B)[]): B[]
    <A, B>(fab: ((a: A) => B)[]): (self: A[]) => B[]
} = dual(2, <A, B>(self: A[], fab: ((a: A) => B)[]): B[] => {
    return pipe(
        fab,
        flatMap(f => map(self, f))
    )
})

export const mapN = <F extends HKT>(
    F: Applicative<F>
): {
    <B, E, R, Fas extends Kind<F, any, E, R>[]>(
        self: [...Fas],
        f: (args: { [k in keyof Fas]: Fas[k] extends Kind<F, infer A, E, R> ? A : never }) => B
    ): Kind<F, B, E, R>
    <B, E, R, Fas extends Kind<F, any, E, R>[]>(
        f: (args: { [k in keyof Fas]: Fas[k] extends Kind<F, infer A, E, R> ? A : never }) => B
    ): (self: [...Fas]) => Kind<F, B, E, R>
} =>
    dual(
        2,
        <B, E, R, Fas extends Kind<F, any, E, R>[]>(
            self: [...Fas],
            f: (args: { [k in keyof Fas]: Fas[k] extends Kind<F, infer A, E, R> ? A : never }) => B
        ): Kind<F, B, E, R> => {
            return F.map(sequence(F)(self), f)
        }
    )

export { apply }
