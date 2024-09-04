import { assertThat } from "mismatched"
import { filter } from "./filter"

describe("array filter", () => {
    it("empty array", () => {
        assertThat(filter([], a => a === 1)).is([])
    })

    it("prediate miss", () => {
        assertThat(filter([1, 2, 3, 4, 5, 6, 7, 8, 9], a => a > 50)).is([])
    })

    it("small array", () => {
        assertThat(filter([1, 2, 3, 4, 5, 6, 7, 8, 9], a => a > 5)).is([6, 7, 8, 9])
    })

    it("type predicate", () => {
        assertThat(filter([1, "2", 3, "4", 5, "6", 7, "8", 9], (a): a is number => typeof a === 'number')).is([1, 3, 5, 7, 9])
    })
})
