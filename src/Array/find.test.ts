import { assertThat } from "mismatched"
import {find } from "./find"
import { none, some } from "../Option"

describe("array find", () => {

    it("empty array", () => {
        assertThat(find([], (a) => a === 1)).is(none())
    })

    it("small array", () => {
        assertThat(find([9, 8, 7, 6, 1, 5, 4, 3, 2], (a) => a === 1)).is(some(1))
    })

    it("predicate miss", () => {
        assertThat(find([9, 8, 7, 6, 1, 5, 4, 3, 2], (a) => a === 100)).is(none())
        assertThat(find([9, 8, 7, 6, 1, 5, 4, 3, 2], (a) => a as any === "hello")).is(none())
    })
})
