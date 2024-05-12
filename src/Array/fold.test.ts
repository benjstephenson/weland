import { assertThat } from "mismatched"
import { fold, unfold } from "../../src/Array"
import { pipe } from "../../src/functions"

describe("Foldable", () => {
    it("unfold()", () => {
        const result = unfold(1, n => {
            if (n >= 10) return undefined

            return [n, n + 1]
        })

        assertThat(result).is([1, 2, 3, 4, 5, 6, 7, 8, 9])
    })

    it("fold()", () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        const result = fold(array, 0, (acc, val) => acc + val)
        assertThat(
            pipe(
                array,
                fold(0, (acc, val) => acc + val)
            )
        ).is(result)
        assertThat(result).is(45)
    })
})
