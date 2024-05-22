import { assertThat } from "mismatched"
import { pipe } from "../functions"
import { apply } from "./apply"
import { map } from "./map"
import { left, right } from "./constructors"
import { getValidation } from "./instance"
import { Sg } from ".."
import { mapN } from "../Array"

describe("either apply", () => {
    const inc = (a: number) => a + 1
    const opt = right(1)

    it("compose", () => {
        assertThat(pipe(opt, apply(right(inc)), apply(right(inc)))).is(right(3))
        assertThat(pipe(opt, apply(right(inc)), apply(right(inc)))).is(pipe(opt, map(inc), map(inc)))
    })

    it("mapN", () => {
        const a = getValidation(Sg.array<string>())
        const m = mapN(a)

        assertThat(m([right(1), right(2), right(3)], ([a, b, c]) => "hello")).is(right("hello"))
        assertThat(m([right(1), right(2), left(["oops"])], ([a, b, c]) => "hello")).is(left(["oops"]))
        assertThat(m([left(["oopsy"]), right(2), left(["daisy"])], ([a, b, c]) => "hello")).is(left(["oopsy", "daisy"]))
    })
})
