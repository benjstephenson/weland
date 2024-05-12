export type Left<E> = {
    _tag: "left"
    value: E
}

export type Right<A> = {
    _tag: "right"
    value: A
}

export type Either<A, E = never> = Left<E> | Right<A>

export { map, flatMap } from "./map"
export { apply } from "./apply"
export { left, right } from "./constructors"
export { EitherM as Monad, getSemigroup, getLeftSemigroup } from "./instance"
export { mapN } from "./mapN"
