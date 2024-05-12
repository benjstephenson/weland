import { Option } from "."
import { dual } from "../functions"
import { some } from "./constructors"

const map: {
    <A, B>(self: Option<A>, f: (a: A) => B): Option<B>
    <A, B>(f: (a: A) => B): (self: Option<A>) => Option<B>
} = dual(2, <A, B>(self: Option<A>, f: (a: A) => B): Option<B> => {
    return self._tag === "some" ? some(f(self.value)) : self
})

const flatMap: {
    <A, B>(self: Option<A>, f: (a: A) => Option<B>): Option<B>
    <A, B>(f: (a: A) => Option<B>): (self: Option<A>) => Option<B>
} = dual(2, <A, B>(self: Option<A>, f: (a: A) => Option<B>): Option<B> => {
    return self._tag === "some" ? f(self.value) : self
})

export { map, flatMap }
