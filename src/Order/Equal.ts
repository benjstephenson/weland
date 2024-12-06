export interface Equal<A> {
    equals: (x: A, y: A) => boolean
}

export const contramap = <A, B>(f: (b: B) => A, eqA: Equal<A>): Equal<B> => from((x, y) => eqA.equals(f(x), f(y)))

export const from = <A>(equals: (x: A, y: A) => boolean): Equal<A> => ({
    equals
})

export const primitive = <A>() => from((x: A, y: A) => x === y)

export const always = <A>() => from((_: A, _1: A) => true)
export const never = <A>() => from((_: A, _1: A) => false)

export function record<R extends Record<string | number | symbol, any>>(equalities: {
    [K in keyof R]: Equal<R[K]>
}): Equal<R> {
    return from((x, y) => {
        for (const key in equalities) {
            if (equalities[key].equals(x[key], y[key]) === false) {
                return false
            }
        }
        return true
    })
}

export const array = <A>(eq: Equal<A>): Equal<A[]> => from((xs, ys) =>
    xs.length === ys.length && xs.every((x, i) => eq.equals(x, ys[i]))
)

export const string: Equal<string> = primitive()
export const number: Equal<number> = primitive()
export const boolean: Equal<boolean> = primitive()
export const date: Equal<Date> = contramap(d => d.valueOf(), number)

