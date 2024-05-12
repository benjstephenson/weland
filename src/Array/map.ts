import { dual, identity } from "../functions"
import { AnyArray, ArrayElem, InferArrayType } from "./types"

export const map: {
    <Arr extends AnyArray, B>(self: Arr, f: (a: ArrayElem<Arr>) => B): InferArrayType<Arr, B>
    <Arr extends AnyArray, B>(f: (a: ArrayElem<Arr>) => B): (self: Arr) => InferArrayType<Arr, B>
} = dual(2, <A, B>(self: A[], f: (a: A) => B): B[] => self.map(f))

export const flatMap: {
    <Arr extends AnyArray, B>(self: Arr, f: (a: ArrayElem<Arr>) => InferArrayType<Arr, B>): InferArrayType<Arr, B>
    <Arr extends AnyArray, B>(f: (a: ArrayElem<Arr>) => InferArrayType<Arr, B>): (self: Arr) => InferArrayType<Arr, B>
} = dual(2, <A, B>(self: A[], f: (a: A) => B[]): B[] => self.flatMap(f))

export const flatten = <Arr extends Array<Array<any>>>(self: Arr): Arr extends Array<Array<infer U>> ? U[] : never =>
    flatMap(self, identity) as any
