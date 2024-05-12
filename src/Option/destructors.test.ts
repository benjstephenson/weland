import { assertThat } from "mismatched"
import { none, of } from "./constructors"
import { toArray, toEither } from "./destructors"
import { left, right } from "../Either"

describe("option destructors", () => {
    const option = of(1)

    it("toEither", () => {
        const error = "oops"

        assertThat(toEither(option, () => error)).is(right(1))
        assertThat(toEither(none(), () => error)).is(left(error))
    })

    it("toArray", () => {
        assertThat(toArray(option)).is([1])
        assertThat(toArray(none())).is([])
    })
})
