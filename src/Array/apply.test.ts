import { assertThat } from "mismatched"
import { pipe } from "../functions"
import { apply } from "./apply"

describe("array apply", () => {
    const inc = (a: number) => a + 1
    const array = [1, 1, 1, 1]

    it("compose", () => {
        assertThat(pipe(array, apply([inc]), apply([inc]))).is([3, 3, 3, 3])
        assertThat(pipe(array, apply([inc]), apply([inc]))).is(array.map(inc).map(inc))
    })

    it("multiple functions", () => {
        assertThat(pipe(array, apply([inc, inc]))).is([2, 2, 2, 2, 2, 2, 2, 2])
    })
})
