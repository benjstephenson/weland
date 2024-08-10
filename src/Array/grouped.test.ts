import * as fc from "fast-check"
import { grouped } from "./grouped"
import { assertThat } from "mismatched"

describe("grouped", () => {
    it("empty array", () => {
        assertThat(grouped([], 2)).is([])
    })

    it("groups an array", () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
        const result = grouped(array, 2)
        assertThat(result).is([
            [1, 2],
            [3, 4],
            [5, 6],
            [7, 8],
            [9, 0]
        ])
    })

    it("handles when the array length isn't divisible by the window size", () => {
        const array = [1, 2, 3, 4, 5]
        const result = grouped(array, 2)
        assertThat(result).is([[1, 2], [3, 4], [5]])
    })

    it("produces arrays of expected sizes", () => {
        fc.assert(
            fc.property(
                fc.array(fc.integer(), { minLength: 1 }),
                fc.integer({ min: 1, max: 10 }),
                (arr, windowSize) => {
                    const windows = grouped(arr, windowSize)
                    windows.forEach((window, idx) =>
                        assertThat(window.length <= windowSize)
                            .withMessage(`Window at ${idx} is not at most expected size ${windowSize}`)
                            .is(true)
                    )

                    arr.forEach((element, idx) =>
                        assertThat(windows.some(window => window.includes(element)))
                            .withMessage(
                                `Input element ${element} at source index ${idx} is not present in output windows`
                            )
                            .is(true)
                    )
                }
            )
        )
    })
})
