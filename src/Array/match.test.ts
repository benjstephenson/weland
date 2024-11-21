import { assertThat } from "mismatched"
import { match } from "./match"
import { map } from "."

const inc = (a: number) => a + 1

describe("array match", () => {
    it("none", () => {
        assertThat(match([], { 1: (n) => [inc(n)], nonEmpty: map(inc), empty: () => [10] })).is([10])
    })

    it("one", () => {
        assertThat(match([1], { 1: (a) => [inc(a)], nonEmpty:() => [1000], empty: () => [10] })).is([2])
    })

    it("some", () => {
        assertThat(match([1, 2, 3, 4, 5], { nonEmpty: map(inc), 1: (a) => [inc(a)], empty: () => [10] })).is([2, 3, 4, 5, 6])
    })
})
