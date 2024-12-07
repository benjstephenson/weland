import { dual, identity } from "../functions"
import { Reducer, transduce, Transducer } from "./transduce"


const accumulate = <A>(): Reducer<A, A[]> => ({
    _tag: "Reducer",
    init: () => [],
    reduce: (acc, val) => [...acc, val],
    complete: identity
})

export const array: {
    <A, B>(input: Iterable<A>, transducer: Transducer<A, B>): B[]
    <A, B>(transducer: Transducer<A, B>): (input: Iterable<A>) => B[]
} = dual(2, <A, B>(input: Iterable<A>, transducer: Transducer<A, B>) =>
    transduce(input, transducer, accumulate(), [])
)
