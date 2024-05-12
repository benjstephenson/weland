import { assertThat } from "mismatched"
import { left, right, tryCatch, tryCatchWith } from "./constructors"

describe("Either constructors", () => {
    it("tryCatch", () => {
        assertThat(tryCatch(() => 1)).is(right(1))
        assertThat(
            tryCatch(() => {
                throw "oops"
            })
        ).is(left(new Error("oops")))

        assertThat(
            tryCatch(() => {
                throw new Error("oops")
            })
        ).is(left(new Error("oops")))
    })

    it("tryCatchWith", () => {
        assertThat(
            tryCatchWith(
                () => 1,
                e => e
            )
        ).is(right(1))
        assertThat(
            tryCatchWith(
                () => {
                    throw "oops"
                },
                _ => "wowsers"
            )
        ).is(left("wowsers"))

        assertThat(
            tryCatchWith(
                () => {
                    throw new Error("oops")
                },
                e => e
            )
        ).is(left(new Error("oops")))
    })
})
