import { Equal } from "../Order/Equal"
import { dual } from "../functions"

export const contains: {
    <A>(self: A[], eq: Equal<A>, item: A): boolean,
    <A>(eq: Equal<A>, item: A): (self: A[]) => boolean
} = dual(3, <A>(self: A[], eq: Equal<A>, item: A): boolean => {
    return self.some(a => eq.equals(a, item))
})
