import { assertThat } from "mismatched"
import * as Ord from "./Orderable"

describe("Orderable", () => {
    it("number", () => {
        assertThat(Ord.number.lessThan(1, 1)).is(false)
        assertThat(Ord.number.lessThan(1, 2)).is(true)
        assertThat(Ord.number.greaterThan(3, 2)).is(true)
        assertThat(Ord.number.greaterThan(2, 3)).is(false)
    })

    it("string", () => {
        assertThat(Ord.string.lessThan("1", "1")).is(false)
        assertThat(Ord.string.lessThan("1", "2")).is(true)
        assertThat(Ord.string.greaterThan("3", "2")).is(true)
        assertThat(Ord.string.greaterThan("2", "3")).is(false)
    })

    it("boolean", () => {
        assertThat(Ord.boolean.lessThan(false, false)).is(false)
        assertThat(Ord.boolean.lessThan(false, true)).is(true)
        assertThat(Ord.boolean.greaterThan(true, false)).is(true)
        assertThat(Ord.boolean.greaterThan(false, true)).is(false)
    })

    it("date", () => {
        const date1 = new Date(2020, 1, 1)
        const date2 = new Date(2022, 1, 1)
        assertThat(Ord.date.lessThan(date1, date2)).is(true)
        assertThat(Ord.date.lessThan(date2, date1)).is(false)
        assertThat(Ord.date.greaterThan(date2, date1)).is(true)
        assertThat(Ord.date.greaterThan(date1, date2)).is(false)
    })
})
