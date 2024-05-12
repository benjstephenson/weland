import { assertThat } from "mismatched"
import { pipe } from "../functions"
import { apply } from "./apply"
import { none, of } from "./constructors"
import { map } from "./map"
import { mapN } from "./mapN"

describe("option apply", () => {
    const inc = (a: number) => a + 1
    const opt = of(1)

    it("compose", () => {
        assertThat(pipe(opt, apply(of(inc)), apply(of(inc)))).is(of(3))
        assertThat(pipe(opt, apply(of(inc)), apply(of(inc)))).is(pipe(opt, map(inc), map(inc)))
    })

    it("apply all", () => {
        assertThat(mapN([of(1), of("hello")], ([a, b]) => b.length + a)).is(of(6))
        assertThat(mapN([of(1), none<string>()], ([a, b]) => b.length + a)).is(none())
    })
})
