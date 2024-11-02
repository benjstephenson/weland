import { dual } from "../functions"

export const filter: {
    <A, B extends A>(self: A[], pred: (a: A) => a is B): B[]
    <A, B extends A>(pred: (a: A) => a is B): (self: A[]) => B[]
    <A>(self: A[], pred: (a: A) => boolean): A[]
    <A>(pred: (a: A) => boolean): (self: A[]) => A[]
} = dual(2, <A>(self: A[], pred: (a: A) => boolean): A[] => self.filter(pred))


export const filterMap: {
    <A, B extends A, C>(self: A[], pred: (a: A) => a is B, f: (b: B) => C): C[]
    <A, B extends A, C>(pred: (a: A) => a is B, f: (b: B) => C): (self: A[]) => B[]
    <A, B>(self: A[], pred: (a: A) => boolean, f: (a: A) => B): B[]
    <A, B>(pred: (a: A) => boolean, f: (a: A) => B): (self: A[]) => B[]
} = dual(3, <A, B>(self: A[], pred: (a: A) => boolean, f: (a: A) => B): B[] => {
    let out: B[] = []

    for (const a of self) {
        if (pred(a)) out.push(f(a))
    }

    return out
})
