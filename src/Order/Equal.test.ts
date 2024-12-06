import { assertThat } from "mismatched"
import * as Eq from "./Equal"
import fc from "fast-check"

describe("Equal", () => {
    it("number", () => {
        fc.assert(fc.property(fc.integer(), num => 
            assertThat(Eq.number.equals(num, num)).is(true)
        ))
        assertThat(Eq.number.equals(1, 2)).is(false)
    })

    it("string", () => {
        fc.assert(fc.property(fc.string(), str => 
            assertThat(Eq.string.equals(str, str)).is(true)
        ))

        assertThat(Eq.string.equals("1", "2")).is(false)
    })

    it("boolean", () => {
        assertThat(Eq.boolean.equals(false, false)).is(true)
        assertThat(Eq.boolean.equals(true, true)).is(true)
        assertThat(Eq.boolean.equals(true, false)).is(false)
    })

    it("date", () => {
        fc.assert(fc.property(fc.date(), date => 
            assertThat(Eq.date.equals(date, date)).is(true)
        ))

        const date1 = new Date(2020, 1, 1)
        const date2 = new Date(2022, 1, 1)
        assertThat(Eq.date.equals(date1, date2)).is(false)
    })

    it("record", () => {
        const rec1 = {
            foo: 1,
            bar: "hello",
            baz: false,
            boo: new Date(2023, 2, 4)
        }
        const rec2 = {
            foo: 1,
            bar: "hello",
            baz: true,
            boo: new Date(2023, 2, 4)
        }

        const eq = Eq.record<typeof rec1>({
            foo: Eq.number,
            bar: Eq.string,
            baz: Eq.boolean,
            boo: Eq.date
        })

        assertThat(eq.equals(rec1, rec1)).is(true)
        assertThat(eq.equals(rec1, rec2)).is(false)
    })

    it("array", () => {
        fc.assert(fc.property(fc.array(fc.integer()), arr => {
            assertThat(Eq.array(Eq.number).equals(arr, arr)).is(true)
        }))

        assertThat(Eq.array(Eq.number).equals([1, 2, 3, 4], [])).is(false)
        assertThat(Eq.array(Eq.number).equals([1, 2, 3, 4], [1, 2, 3])).is(false)
        assertThat(Eq.array(Eq.number).equals([1, 2, 3, 4], [3, 4, 5, 6])).is(false)
    })
})
