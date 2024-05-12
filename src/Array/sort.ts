import { AnyArray, ArrayElem, InferArrayType } from "./types"
import * as Ord from "../Order/Orderable"
import { dual } from "../functions"

export const sort: {
    <Arr extends AnyArray>(self: Arr, ord: Ord.Ord<ArrayElem<Arr>>): Arr
    <Arr extends AnyArray>(ord: Ord.Ord<ArrayElem<Arr>>): (self: Arr) => Arr
} = dual(2, <A>(self: A[], ord: Ord.Ord<A>) => self.slice().sort((x, y) => ord.compare(x, y)))

export const sortWith: {
    <Arr extends AnyArray, B>(
        self: Arr,
        f: (a: ArrayElem<Arr>) => B,
        ord: Ord.Ord<B>
    ): InferArrayType<Arr, ArrayElem<Arr>>
    <Arr extends AnyArray, B>(
        f: (a: ArrayElem<Arr>) => B,
        ord: Ord.Ord<B>
    ): (self: Arr) => InferArrayType<Arr, ArrayElem<Arr>>
} = dual(3, <A, B>(self: A[], f: (a: A) => B, ord: Ord.Ord<B>) => {
    return sort(
        self,
        Ord.from((x, y) => ord.compare(f(x), f(y)))
    )
})
