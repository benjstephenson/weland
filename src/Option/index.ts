export type Some<A> = {
    _tag: "some"
    value: A
}

export type None = {
    _tag: "none"
}

export type Option<A> = Some<A> | None
export { some, none, of } from "./constructors"
export { map, flatMap } from "./map"
export { apply } from "./apply"
export { isSome, isNone } from "./instance"
export { OptionM as Monad, getSemigroup } from "./instance"
