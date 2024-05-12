import { Option, isSome } from "."
import { dual } from "../functions"

export const getOrElse: {
    <A>(self: Option<A>, alt: () => A): A
    <A>(alt: () => A): (self: Option<A>) => A
} = dual(2, <A>(self: Option<A>, alt: () => A): A => (isSome(self) ? self.value : alt()))

export const orElse: {
    <A>(self: Option<A>, alt: () => Option<A>): Option<A>
    <A>(alt: () => Option<A>): (self: Option<A>) => Option<A>
} = dual(2, <A>(self: Option<A>, alt: () => Option<A>): Option<A> => (isSome(self) ? self : alt()))

export const getOrUndefined = <A>(self: Option<A>): A | undefined => (isSome(self) ? self.value : undefined)
