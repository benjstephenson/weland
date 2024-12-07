import { Predicate, Transducer } from "./transduce"

export const filter = <A>(pred: Predicate<A>): Transducer<A, A> =>
    reducer => ({
        ...reducer,
        reduce: (acc, val) => pred(val) ? reducer.reduce(acc, val) : acc
    })
