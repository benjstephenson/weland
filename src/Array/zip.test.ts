import * as fc from "fast-check"
import { unzip, zip } from "./zip"
import { assertThat } from "mismatched"

describe("zip", () => {
    it("zips and unzips", () => {
        fc.assert(
            fc.property(fc.array(fc.anything()), array => {
                const result = zip(array, array)
                assertThat(result.length).is(array.length)
                const [as, bs] = unzip(result)
                assertThat(as).is(array)
                assertThat(bs).is(array)
            })
        )
    })

    it("zips to the length of the shortest array", () => {
        fc.assert(
            fc.property(fc.array(fc.anything()), fc.anything(), (array, item) => {
                const array2 = [...array, item]
                const result = zip(array, array2)
                assertThat(result.length).is(array.length)
            })
        )
    })

    it("unzips arrays", () => {
        const [as, bs] = unzip([
            [1, 2],
            [3, 4],
            [5, 6],
            [7, 8],
            [9, 0]
        ])
        assertThat(as).is([1, 3, 5, 7, 9])
        assertThat(bs).is([2, 4, 6, 8, 0])
    })

    it("unzips empty arrays", () => {
        const [as, bs] = unzip([])
        assertThat(as).is([])
        assertThat(bs).is([])
    })
})
