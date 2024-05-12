import { assertThat } from "mismatched"
import { match } from "./match"
import { map } from "."

const inc = (a: number) => a + 1

describe("option match", () => {
    it("none", () => {
        assertThat(match([], { nonEmpty: map(inc), empty: () => [10] })).is([10])
    })

    it("some", () => {
        assertThat(match([1, 2, 3, 4, 5], { nonEmpty: map(inc), empty: () => [10] })).is([2, 3, 4, 5, 6])
    })
})
