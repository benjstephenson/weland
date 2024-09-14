import { assertThat } from "mismatched"
import { make, min } from "../../src/Array"
import { Order } from ".."

describe("min", () => {
    it("numbers", () => {
        const arr = make(1, 2, 3, 40, 5, 6, 70, 8, 9, 0)
        const result = min(arr, Order.number)

        assertThat(result).is(0)
    })

    it("string length", () => {
        const arr = make("1", "22", "3", "40", "5     ", "6", "hello", "world")
        const result = min(
            arr,
            Order.contramap(x => x.length, Order.number)
        )

        assertThat(result).is("6")
    })
})
