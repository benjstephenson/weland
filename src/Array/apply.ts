import { dual, pipe } from "../functions"
import { Applicative } from "../typeclass/applicative"
import { HKT, Kind } from "../typeclass/hkt"
import { flatMap, map } from "./map"
import { tuple } from "./constructors"

const apply: {
    <A, B>(self: A[], fab: ((a: A) => B)[]): B[]
    <A, B>(fab: ((a: A) => B)[]): (self: A[]) => B[]
} = dual(2, <A, B>(self: A[], fab: ((a: A) => B)[]): B[] => {
    return pipe(
        fab,
        flatMap(f => map(self, f))
    )
})

const mapN = <F extends HKT>(
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
            self: Fas,
            f: (args: { [k in keyof Fas]: Fas[k] extends Kind<F, infer A, E, R> ? A : never }) => B
        ): Kind<F, B, E, R> => {
            const build = (list: Fas) => {
                const [head, ...tail] = list
                let out: Kind<F, any[], E, R> = F.map(head, tuple)
                for (let i = 0; i < tail.length; i++) {
                    out = F.apply(
                        out,
                        F.map(tail[i], v => a => tuple(...a, v))
                    )
                }
                return out
            }

            return F.map(build(self), f)
        }
    )

export { apply, mapN }
