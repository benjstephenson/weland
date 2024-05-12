import { assertThat } from "mismatched"
import { some, none, tryCatch } from "./constructors"

describe("Option constructors", () => {
    it("tryCatch", () => {
        assertThat(tryCatch(() => 1)).is(some(1))
        assertThat(
            tryCatch(() => {
                throw "oops"
            })
        ).is(none())

        assertThat(
            tryCatch(() => {
                throw new Error("oops")
            })
        ).is(none())
    })
})
