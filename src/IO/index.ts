type IO<A> = {
    _tag: "io"
    thunk: () => A
}

class IOImpl<A> implements IO<A> {
    _tag: "io"
    thunk: () => A
}
