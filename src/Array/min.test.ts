import { assertThat } from "mismatched"
import { make, min } from "../../src/Array"
import { Ord } from ".."

describe("min", () => {
    it("numbers", () => {
        const arr = make(1, 2, 3, 40, 5, 6, 70, 8, 9, 0)
        const result = min(arr, Ord.number)

        assertThat(result).is(0)
    })

    it("string length", () => {
        const arr = make("1", "22", "3", "40", "5     ", "6", "hello", "world")
        const result = min(
            arr,
            Ord.contramap(x => x.length, Ord.number)
        )

        assertThat(result).is("6")
    })
})
