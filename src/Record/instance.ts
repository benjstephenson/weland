import { HKT } from "../typeclass/hkt"
import { Semigroup } from "../typeclass/semigroup"

interface RecF extends HKT {
    readonly type: Array<this["A"]>
}

type SemigroupFor<A extends Record<string | number, any>> = {
    [key in keyof A]: Semigroup<A[key]>
}

const getSemigroup = <A extends Record<string | number, any>>(S: SemigroupFor<A>): Semigroup<A> => ({
    concat: (x: A, y: A) => 
        (Object.keys(x) as (keyof A)[]).reduce<A>((acc, key) => {
            acc[key] = S[key].concat(x[key], y[key])
            return acc
        },
            {} as A)
    
})

export { RecF, getSemigroup }
