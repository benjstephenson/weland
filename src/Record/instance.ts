import { HKT } from "../typeclass/hkt"

interface RecF extends HKT {
    readonly type: Array<this["A"]>
}

//const getSemigroup = <A>(S: Semigroup<A>): Semigroup<A[]> => ({
//    concat: (x, y) => zipWith(x, y, S.concat)
//})
//
//const getFold = <A>(M: Monoid<A>) => fromMonoid(M, ArrayM)
//
//export { ArrayF, ArrayM, isEmpty, isNonEmpty, getSemigroup, getFold }
