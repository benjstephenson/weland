import { Either } from "."
import { dual } from "../functions"

const EitherPrototype = {
    toJSON<A, E>(this: Either<A, E>) {
        return this._tag === "left" ? `Left(${JSON.stringify(this.value)})` : `Right(${JSON.stringify(this.value)})`
    },

    toString<A, E>(this: Either<A, E>) {
        return this._tag === "left" ? `Left(${this.value})` : `Right(${this.value})`
    },

    [require("util").inspect.custom]<A, E>(this: Either<A, E>) {
        return this.toString()
    }
}

const left = <E>(e: E): Either<never, E> => {
    return Object.assign(Object.create(EitherPrototype), { _tag: "left", value: e } as const)
}

const right = <A>(a: A): Either<A> => {
    return Object.assign(Object.create(EitherPrototype), { _tag: "right", value: a } as const)
}

const tryCatch = <A>(f: () => A): Either<A, Error> => {
    try {
        const result = f()
        return right(result)
    } catch (e) {
        if (e instanceof Error) return left(e)
        return left(new Error(e))
    }
}

const tryCatchWith: {
    <A, E>(f: () => A, catchFn: (e: unknown) => E): Either<A, E>
    <A, E>(catchFn: (e: unknown) => E): (f: () => A) => Either<A, E>
} = dual(2, <A, E>(f: () => A, catchFn: (e: unknown) => E): Either<A, E> => {
    try {
        const result = f()
        return right(result)
    } catch (e) {
        return left(catchFn(e))
    }
})

export { left, right, tryCatch, tryCatchWith }
