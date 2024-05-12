import { assertThat } from "mismatched"
import { match } from "./match"
import { left, right } from "./constructors"

describe("option match", () => {
    it("none", () => {
        assertThat(match(left(1), { right: a => a + 1, left: _ => 10 })).is(10)
    })

    it("some", () => {
        assertThat(match(right(1), { right: a => a + 1, left: _ => 10 })).is(2)
    })
})
