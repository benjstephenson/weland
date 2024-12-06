import { assertThat } from "mismatched"
import { Equal } from ".."
import { contains } from "./contains"

describe("contains", () => {

    it("returns true", () => {
        assertThat(contains([1, 2, 3, 4, 5], Equal.number, 3)).is(true)
        assertThat(contains(["1", "2", "3", "4", "5"], Equal.string, "3")).is(true)
        assertThat(contains([true, true, false, true], Equal.boolean, false)).is(true)
    })

    it("returns false", () => {
        assertThat(contains([1, 2, 3, 4, 5], Equal.number, 30)).is(false)
        assertThat(contains(["1", "2", "3", "4", "5"], Equal.string, "30")).is(false)
        assertThat(contains([true, true, true, true], Equal.boolean, false)).is(false)
    })
})
