import { assertThat } from "mismatched"
import { pipe } from "../functions"
import { apply } from "./apply"
import { map } from "./map"
import { right } from "./constructors"

describe("either apply", () => {
    const inc = (a: number) => a + 1
    const opt = right(1)

    it("compose", () => {
        assertThat(pipe(opt, apply(right(inc)), apply(right(inc)))).is(right(3))
        assertThat(pipe(opt, apply(right(inc)), apply(right(inc)))).is(pipe(opt, map(inc), map(inc)))
    })
})
