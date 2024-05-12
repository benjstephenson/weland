import { assertThat } from "mismatched"
import { identity } from "../functions"
import { none, of } from "./constructors"
import { flatMap, map } from "."

const inc = (a: number) => a + 1

describe("option functor", () => {
    it("preserves none", () => {
        assertThat(map(none(), x => x + 1)).is(none())
    })

    it("identity", () => {
        const some = of(1)
        assertThat(map(some, identity)).is(some)
    })

    it("composition", () => {
        const some = of(1)
        assertThat(map(map(some, inc), inc)).is(map(some, x => inc(inc(x))))
    })
})

describe("option monad", () => {
    const f = (x: number) => of(inc(x))
    const value = 1
    const pure = of(value)

    it("preserves none", () => {
        assertThat(flatMap(none(), f)).is(none())
        assertThat(flatMap(pure, _ => none())).is(none())
    })

    it("left identity", () => {
        assertThat(flatMap(pure, f)).is(f(value))
    })

    it("right identity", () => {
        assertThat(flatMap(pure, of)).is(pure)
    })

    it("associativity", () => {
        assertThat(flatMap(flatMap(pure, f), f)).is(flatMap(pure, x => flatMap(f(x), f)))
    })
})
