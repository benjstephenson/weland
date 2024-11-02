export type NonEmptyArray<A> = [A, ...A[]]

export type AnyArray = NonEmptyArray<any> | any[]

export type ArrayElem<Arr extends NonEmptyArray<any> | any[]> =
    Arr extends NonEmptyArray<infer A> ? A : Arr extends (infer A)[] ? A : never

export type InferArrayType<Arr extends NonEmptyArray<any> | any[], A> =
    Arr extends NonEmptyArray<any> ? NonEmptyArray<A> : A[]

export type Tupled<T, N extends number, R extends any[] = []> = R['length'] extends N ? R : Tupled<T, N, [T, ...R]>
