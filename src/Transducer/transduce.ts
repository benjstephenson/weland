export type Reduced<A> = {
    _tag: "Reduced"
    value: A
}

export const Reduced = <A>(value: A): Reduced<A> => ({ _tag: "Reduced", value })

export const isReduced = <A>(o: any): o is Reduced<A> => typeof o === "object" && o["_tag"] === "Reduced"

export type ReduceFn<A, B> = (acc: B, val: A) => Reduced<B> | B

export type Reducer<A, B> = {
    _tag: "Reducer",
    init: () => B,
    reduce: ReduceFn<A, B>
    complete: (b: B) => B
}

export type Transducer<A, B> = <C>(reducer: Reducer<B, C>) => Reducer<A, C>

export type Predicate<A> = (val: A) => boolean

export const transduce = <A, B, C>(input: Iterable<A>, transducer: Transducer<A, B>, reducer: Reducer<B, C>, empty: C): C => {
    let accum = empty

    for (let i of input) {
        const step = transducer(reducer).reduce(accum, i)
        if (isReduced(step)) {
            return step.value
        }
        accum = step
    }

    return accum
}

export function compose<A, B, C>(ab: Transducer<A, B>, bc: Transducer<B, C>): Transducer<A, C>
export function compose<A, B, C, D>(ab: Transducer<A, B>, bc: Transducer<B, C>, cd: Transducer<C, D>): Transducer<A, D>
export function compose<A, B, C, D, E>(ab: Transducer<A, B>, bc: Transducer<B, C>, cd: Transducer<C, D>, de: Transducer<D, E>): Transducer<A, E>
export function compose<A, B, C, D, E, F>(ab: Transducer<A, B>, bc: Transducer<B, C>, cd: Transducer<C, D>, de: Transducer<D, E>, ef: Transducer<E, F>): Transducer<A, F>
export function compose<A, B, C, D, E, F, G>(ab: Transducer<A, B>, bc: Transducer<B, C>, cd: Transducer<C, D>, de: Transducer<D, E>, ef: Transducer<E, F>, fg: Transducer<F, G>): Transducer<A, G>
export function compose(...transducers: any[]) {
    return reducer => transducers
        .reduceRight((rf, xf) => xf(rf), reducer)
}
