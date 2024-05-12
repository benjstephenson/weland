import { assertThat } from "mismatched"
import * as M from "."
import { ArrayM } from "../Array/instance"
import { fromMonoid } from "../typeclass/foldable"

describe("monoid primitives", () => {
    it("number", () => {
        const fold = fromMonoid(M.number, ArrayM)
        assertThat(fold([1, 2, 3, 4, 5])).is(15)
    })

    it("string", () => {
        const fold = fromMonoid(M.string, ArrayM)
        assertThat(fold(["1", "2", "3", "4", "5"])).is("12345")
    })

    it("array", () => {
        const fold = fromMonoid(M.array<string>(), ArrayM)
        assertThat(fold([["1"], ["2"], ["3"], ["4"], ["5"]])).is(["1", "2", "3", "4", "5"])
    })
})
