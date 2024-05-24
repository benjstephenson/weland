import { assertThat } from "mismatched"
import { pipe } from "../functions"
import { apply } from "./apply"
import { map } from "./map"
import { left, right } from "./constructors"
import { getValidation } from "./instance"
import { Sg } from ".."
import { mapN } from "../Array"
import { Either, mapN as mapNEither } from "../Either"

describe("either apply", () => {
    const inc = (a: number) => a + 1
    const opt = right(1)

    it("compose", () => {
        assertThat(pipe(opt, apply(right(inc)), apply(right(inc)))).is(right(3))
        assertThat(pipe(opt, apply(right(inc)), apply(right(inc)))).is(pipe(opt, map(inc), map(inc)))
    })

    it("applicative semi mapN", () => {
        const a = getValidation(Sg.array<number>())
        const m = mapN(a)

        const result = pipe(
            [right(1), right(2), left(["bang!"])],
            m(([a, b, c]) => `${a}${b}${c}`)
        )

        const result2 = m([right(1), right(2), left(["bang!"])], ([a, b, c]) => `${a}${b}${c}`)
        assertThat(result).is(result2)

        assertThat(m([right(1), right(2), right(3)], () => "hello")).is(right("hello"))
        assertThat(m([right(1), right(2), left(["oops"])], () => "hello")).is(left(["oops"]))
        assertThat(m([left(["oopsy"]), right(2), left(["daisy"])] as Either<number, string[]>[], () => "hello")).is(
            left(["oopsy", "daisy"])
        )
    })

    it("mapN", () => {
        const m = mapNEither
        const result = pipe(
            [right(1), right(2), left(["bang!"])],
            m(([a, b, c]) => `${a}${b}${c}`)
        )
        assertThat(result).is(left(["bang!"]))

        assertThat(m([right(1), right(2), right(3)], () => "hello")).is(right("hello"))
        assertThat(m([right(1), right(2), left(["oops"])], () => "hello")).is(left(["oops"]))
        assertThat(m([left(["oopsy"]), right(2), left(["daisy"])], () => "hello")).is(left(["oopsy"]))
    })
})
