import { assertThat } from "mismatched"
import * as Sg from "."

describe("Semigroup primitives", () => {
    it("left", () => {
        assertThat(Sg.left().concat(1, 2)).is(1)
    })
    it("right", () => {
        assertThat(Sg.right().concat(1, 2)).is(2)
    })
    it("reverse", () => {
        assertThat(Sg.reverse(Sg.right()).concat(1, 2)).is(Sg.left().concat(1, 2))
        assertThat(Sg.reverse(Sg.left()).concat(1, 2)).is(Sg.right().concat(1, 2))
    })
    it("number", () => {
        assertThat(Sg.number.concat(1, 2)).is(3)
    })
    it("string", () => {
        assertThat(Sg.string.concat("1", "2")).is("12")
    })
    it("array", () => {
        assertThat(Sg.array().concat(["1"], ["2"])).is(["1", "2"])
        assertThat(Sg.array().concat([], ["2"])).is(["2"])
        assertThat(Sg.array().concat(["1"], [])).is(["1"])
        assertThat(Sg.array().concat([], [])).is([])
    })
    it("boolean", () => {
        assertThat(Sg.boolean.concat(false, false)).is(false)
        assertThat(Sg.boolean.concat(false, true)).is(false)
        assertThat(Sg.boolean.concat(true, false)).is(false)
        assertThat(Sg.boolean.concat(true, true)).is(true)
    })
})
