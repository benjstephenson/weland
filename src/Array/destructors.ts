import { NonEmptyArray } from "."
import * as Option from "../Option"

const head = <A>(self: A[]): Option.Option<A> => Option.of(self.at(0))
const tail = <A>(self: A[]): A[] => self.slice(1)

const headNonEmpty = <A>(self: NonEmptyArray<A>): A => self[0]

export { head, headNonEmpty, tail }
