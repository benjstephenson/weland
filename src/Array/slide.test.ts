import * as fc from "fast-check"
import { slide, slideWith } from "./slide"
import { assertThat } from "mismatched"

describe("slide", () => {
    it("empty array", () => {
        assertThat(slide([], 2)).is([])
    })

    it("slides over an array", () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
        const result = slide(array, 2)
        assertThat(result).is([
            [1, 2],
            [2, 3],
            [3, 4],
            [4, 5],
            [5, 6],
            [6, 7],
            [7, 8],
            [8, 9],
            [9, 0],
            [0],
        ])
    })

    it("produces arrays of expected sizes", () => {
        fc.assert(
            fc.property(
                fc.array(fc.integer(), { minLength: 1 }),
                fc.integer({ min: 1, max: 10 }),
                (arr, windowSize) => {
                    const windows = slide(arr, windowSize)
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
