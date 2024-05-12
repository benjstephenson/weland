import { assertThat } from "mismatched"
import { split } from "./split"
import * as fc from "fast-check"

describe("split", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

    it("returns empty for empty array", () => {
        assertThat(split([], 5)).is([[], []])
    })

    it("splits at 0", () => {
        assertThat(split(array, 0)).is([[], array])
    })

    it("splits when at > length", () => {
        assertThat(split(array, 50)).is([array, []])
    })

    it("splits", () => {
        assertThat(split(array, 5)).is([
            [1, 2, 3, 4, 5],
            [6, 7, 8, 9, 0]
        ])
    })

    it("produces arrays that make up the original array", () => {
        fc.assert(
            fc.property(fc.array(fc.anything()), array => {
                const at = Math.floor(Math.random() * (array.length + 1))
                const _split = split(array, at)
                assertThat(_split[0].length + _split[1].length).is(array.length)
                assertThat([..._split[0], ..._split[1]]).is(array)
            })
        )
    })
})
