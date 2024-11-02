import { dual } from "../functions";
import { Monoid } from "../typeclass/monoid";
import { isEmpty } from "./instance";


export const sum: {
    <A>(self: A[], M: Monoid<A>): A
    <A>(M: Monoid<A>): (self: A[]) => A
} = dual(2, <A>(self: A[], M: Monoid<A>): A => {
    if (isEmpty(self)) return M.empty
    return self.reduce(M.concat, M.empty)
    //
    //let out = M.empty
    //for (let i = 0; i < self.length; i++) {
    //    M.concat(out, self[i])
    //}
    //return out
})
