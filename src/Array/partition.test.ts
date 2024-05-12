import { assertThat } from "mismatched"
import { pipe } from "../../src/functions"
import { partition } from "../../src/Array"

describe("partition", () => {
    it("empty array", () => {
        const empty: number[] = []
        const piped = pipe(
            empty,
            partition(a => a === 1)
        )
        const result = partition(empty, a => a === 1)

        assertThat(piped).is(result)
        assertThat(result).is([[], []])
    })

    it("numbers array", () => {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
        const piped = pipe(
            arr,
            partition(a => a <= 5)
        )
        const result = partition(arr, a => a <= 5)

        assertThat(piped).is(result)
        assertThat(result).is([
            [1, 2, 3, 4, 5, 0],
            [6, 7, 8, 9]
        ])
    })

    it("heterogenous array", () => {
        const arr = [1, "2", 3, "4", 5, "6", 7, "8", 9, "0"]
        const result = partition(arr, (a): a is string => typeof a === "string")

        assertThat(result).is([
            ["2", "4", "6", "8", "0"],
            [1, 3, 5, 7, 9]
        ])
    })
})
