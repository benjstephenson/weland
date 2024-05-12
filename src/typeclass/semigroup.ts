export interface Semigroup<A> {
    readonly concat: (a: A, b: A) => A
}
