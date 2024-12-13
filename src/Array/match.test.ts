import { assertThat } from "mismatched"
import { match } from "./match"
import { map } from "."

const inc = (a: number) => a + 1

describe("array match", () => {
    it("none", () => {
        const result = match([], { single: (n) => [inc(n)], nonEmpty: map(inc), empty: () => [10] })
        assertThat(result).is([10])
        assertThat(match([], { nonEmpty: map(inc), empty: () => [10] })).is(result)
    })

    it("one", () => {
        const result = match([1], { single: (a) => [inc(a)], nonEmpty:() => [1000], empty: () => [10] })
        assertThat(result).is([2])
        assertThat(match([1], { nonEmpty:(a) => a.map(inc), empty: () => [10] })).is(result)
    })

    it("many", () => {
        assertThat(match([1, 2, 3, 4, 5], { nonEmpty: map(inc), single: (a) => [inc(a)], empty: () => [10] })).is([2, 3, 4, 5, 6])
    })
})
