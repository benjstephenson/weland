export const identity = <A>(a: A) => a

export function dual<DataLast extends (...args: Array<any>) => any, DataFirst extends (...args: Array<any>) => any>(
    arity: Parameters<DataFirst>["length"],
    body: DataFirst
): DataLast & DataFirst
export function dual(arity, body) {
    if (arity < 2) throw new RangeError(`Invalid arity ${arity}`)

    return function () {
        if (arguments.length >= arity) {
            return body.apply(this, arguments)
        }
        const args = arguments
        return function (self: any) {
            return body(self, ...args)
        }
    }
}

export function pipe<A>(a: A): A
export function pipe<A, B>(a: A, ab: (a: A) => B): B
export function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C
export function pipe<A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D
export function pipe<A, B, C, D, E>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): E
export function pipe<A, B, C, D, E, F>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F
): F
export function pipe(a: unknown, ab?: Function, bc?: Function, cd?: Function, de?: Function, ef?: Function): unknown {
    switch (arguments.length) {
        case 1:
            return a
        case 2:
            return ab!(a)
        case 3:
            return bc!(ab!(a))
        case 4:
            return cd!(bc!(ab!(a)))
        case 5:
            return de!(cd!(bc!(ab!(a))))
        case 6:
            return ef!(de!(cd!(bc!(ab!(a)))))
        default:
            const [head, ...rest] = arguments
            return rest.reduce((result, fn) => fn(result), head)
    }
}

export function compose<A, B>(ab: (a: A) => B): (a: A) => B
export function compose<A, B, C>(ab: (a: A) => B, bc: (b: B) => C): (a: A) => C
export function compose<A, B, C, D>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): (a: A) => D
export function compose<A, B, C, D, E>(ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): (a: A) => E
export function compose<A, B, C, D, E, F>(
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F
): (a:A) => F
export function compose(ab: Function, bc?: Function, cd?: Function, de?: Function, ef?: Function): unknown {
    switch (arguments.length) {
        case 1:
            return ab
        case 2:
            return _ => bc!(ab(_))
        case 3:
            return _ => cd!(bc!(ab(_)))
        case 4:
            return _ => de!(cd!(bc!(ab(_))))
        case 5:
            return _ => ef!(de!(cd!(bc!(ab(_)))))
    }

    return
}