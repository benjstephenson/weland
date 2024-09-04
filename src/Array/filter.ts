import { dual } from "../functions"

export const filter: {
    <A,B extends A>(self: A[], pred: (a: A) => a is B): B[]
    <A, B extends A>(pred: (a: A) => a is B): (self: A[]) => B[]
    <A>(self: A[], pred: (a: A) => boolean): A[]
    <A>(pred: (a: A) => boolean): (self: A[]) => A[]
} = dual(2, <A>(self: A[], pred: (a: A) => boolean): A[] => self.filter(pred)) 
