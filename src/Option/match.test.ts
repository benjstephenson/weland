import { assertThat } from "mismatched"
import { none, some } from "./constructors"
import { match } from "./match"

describe("option match", () => {
    it("none", () => {
        assertThat(match(none(), { some: a => a + 1, none: () => 10 })).is(10)
    })

    it("some", () => {
        assertThat(match(some(1), { some: a => a + 1, none: () => 10 })).is(2)
    })
})
