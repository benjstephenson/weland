import { AnyArray, ArrayElem, InferArrayType } from "./types"
import * as Ord from "../Order/Orderable"
import { dual } from "../functions"

export const sort: {
    <Arr extends AnyArray>(self: Arr, ord: Ord.Order<ArrayElem<Arr>>): Arr
    <Arr extends AnyArray>(ord: Ord.Order<ArrayElem<Arr>>): (self: Arr) => Arr
} = dual(2, <A>(self: A[], ord: Ord.Order<A>) => self.slice().sort((x, y) => ord.compare(x, y)))

export const sortWith: {
    <Arr extends AnyArray, B>(
        self: Arr,
        f: (a: ArrayElem<Arr>) => B,
        ord: Ord.Order<B>
    ): InferArrayType<Arr, ArrayElem<Arr>>
    <Arr extends AnyArray, B>(
        f: (a: ArrayElem<Arr>) => B,
        ord: Ord.Order<B>
    ): (self: Arr) => InferArrayType<Arr, ArrayElem<Arr>>
} = dual(3, <A, B>(self: A[], f: (a: A) => B, ord: Ord.Order<B>) => {
    return sort(
        self,
        Ord.from((x, y) => ord.compare(f(x), f(y)))
    )
})
