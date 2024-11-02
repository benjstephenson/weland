import { assertThat } from "mismatched"
import { sum } from "./sum"
import * as Monoid from "../Monoid/index"

describe("sum", () => {

    it("empty array", () => {
        assertThat(sum([], Monoid.number)).is(0)
    })

    it("numbers", () => {
        assertThat(sum([1, 2, 3, 4,5], Monoid.number)).is(15)
    })
})
