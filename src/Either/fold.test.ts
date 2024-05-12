import { assertThat } from "mismatched"
import { pipe } from "../../src/functions"
import { right } from "./constructors"
import { fold } from "./fold"

describe("Either foldable", () => {
    it("fold()", () => {
        const array = right(1)
        const result = fold(array, 5, (acc, val) => acc + val)
        assertThat(
            pipe(
                array,
                fold(5, (acc, val) => acc + val)
            )
        ).is(result)
        assertThat(result).is(6)
    })
})
