import { dual } from "../functions"

export const partition: {
    <A, B extends A>(self: A[], predicate: (a: A) => a is B): [B[], Exclude<A, B>[]]
    <A>(self: A[], predicate: (a: A) => boolean): [A[], A[]]
    <A, B extends A>(predicate: (a: A) => a is B): (self: A[]) => [B[], Exclude<A, B>[]]
    <A>(predicate: (a: A) => boolean): (self: A[]) => [A[], A[]]
} = dual(2, <A>(self: A[], predicate: (a: A) => boolean): [A[], A[]] => {
    const filterOut: A[] = []
    const filterIn: A[] = []

    for (let i = 0; i < self.length; i++) {
        if (predicate(self[i])) {
            filterIn.push(self[i])
        } else {
            filterOut.push(self[i])
        }
    }

    return [filterIn, filterOut]
})
