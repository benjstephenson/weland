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

type InferTuple<F extends HKT, T> = { [k in keyof T]: T[k] extends Kind<F, infer A, any, any> ? A : never }
type Error<F extends HKT, R extends Kind<F, any, any, any>[]> = R extends Kind<F, any, infer E, any>[] ? E : never

const mapN = <F extends HKT>(
    F: Applicative<F>
): {
    <B, Self extends Kind<F, any, F["E"], any>[]>(
        self: [...Self],
        f: (args: InferTuple<F, Self>) => B
    ): Kind<F, B, Error<F, Self>, F["R"]>
    <B, Self extends Kind<F, any, F["E"], F["R"]>[]>(
        f: (args: InferTuple<F, Self>) => B
    ): (self: [...Self]) => Kind<F, B, Error<F, Self>, F["R"]>
} =>
    dual(
        2,
        <B, Self extends Kind<F, any, any, any>[]>(
            self: Self,
            f: (args: InferTuple<F, Self>) => B
        ): Kind<F, B, Error<F, Self>> => {
            const build = (list: Self) => {
                const [head, ...tail] = list
                let out: Kind<F, any[], Error<F, Self>> = F.map(head, tuple)
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
