export type Some<A> = {
    _tag: "some"
    value: A
}

export type None = {
    _tag: "none"
}

export type Option<A> = Some<A> | None
