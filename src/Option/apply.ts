import { Option } from "."
import { flatMap, map } from "./map"
import { dual, pipe } from "../functions"

const apply: {
    <A, B>(self: Option<A>, fab: Option<(a: A) => B>): Option<B>
    <A, B>(fab: Option<(a: A) => B>): (self: Option<A>) => Option<B>
} = dual(2, <A, B>(self: Option<A>, fab: Option<(a: A) => B>): Option<B> => {
    return pipe(
        fab,
        flatMap(f => map(self, f))
    )
})

export { apply }
