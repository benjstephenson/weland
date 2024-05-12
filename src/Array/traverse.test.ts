import { assertThat } from "mismatched"
import * as Option from "../Option"
import { OptionM } from "../Option/instance"
import { sequence, traverse } from "./traverse"

describe("array traversable", () => {
    it("sequence", () => {
        assertThat(sequence(OptionM)([OptionM.of(1), OptionM.of(2), OptionM.of(3)])).is(OptionM.of([1, 2, 3]))
        assertThat(sequence(OptionM)([OptionM.of(1), Option.none(), OptionM.of(3)])).is(Option.none())
    })

    it("traverse", () => {
        assertThat(traverse(OptionM)([1, 2, 3, 4], n => Option.of(n + 1))).is(Option.of([2, 3, 4, 5]))
        assertThat(traverse(OptionM)([1, 2, 3, 4], n => (n % 2 === 0 ? Option.none() : Option.of(n)))).is(Option.none())
    })
})
