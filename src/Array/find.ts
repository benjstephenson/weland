import { Option, of } from "../Option"
import { dual } from "../functions"

export const find: {
    <A>(self: A[], pred: (a: A) => boolean): Option<A>
    <A>(pred: (a: A) => boolean): (self: A[]) => Option<A>
} = dual(2, <A>(self: A[], pred: (a: A) => boolean): Option<A> => of(self.find(pred)))
