import { Transducer } from "./transduce"

export const map = <A, B>(f: (x: A) => B): Transducer<A, B> =>
    reducer => ({
        ...reducer,
        reduce: (acc, val) => reducer.reduce(acc, f(val))
    })
