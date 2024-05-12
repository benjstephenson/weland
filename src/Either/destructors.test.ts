import { assertThat } from "mismatched"
import { left, right } from "./constructors"
import { toArray, toOption } from "./destructors"
import { none, some } from "../Option"

describe("option destructors", () => {
    const option = right(1)
    const error = "oops"

    it("toOption", () => {
        assertThat(toOption(option)).is(some(1))
        assertThat(toOption(left(error))).is(none())
    })

    it("toArray", () => {
        assertThat(toArray(option)).is([1])
        assertThat(toArray(left(error))).is([])
    })
})
