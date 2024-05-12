import { Either } from "."
import { Option, none, some } from "../Option"
import { isLeft } from "./instance"

export const toOption = <A, E>(self: Either<A, E>): Option<A> => (isLeft(self) ? none() : some(self.value))

export const toArray = <A, E>(self: Either<A, E>): A[] => (isLeft(self) ? [] : [self.value])
