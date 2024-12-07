import { Reduced, Transducer } from "./transduce"

export const take = <A>(count: number): Transducer<A, A> => {
    let toTake = count
    return reducer => {
        return {
            ...reducer,
            reduce: (acc, val) => {
                if (toTake > 0) {
                    toTake = toTake - 1
                    return reducer.reduce(acc, val)
                }
                return Reduced(acc)
            }
        }
    }
}
