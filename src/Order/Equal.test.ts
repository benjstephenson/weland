import { assertThat } from "mismatched"
import * as Eq from "./Equal"

describe("Equal", () => {
    it("number", () => {
        assertThat(Eq.number.equals(1, 1)).is(true)
        assertThat(Eq.number.equals(1, 2)).is(false)
    })

    it("string", () => {
        assertThat(Eq.string.equals("1", "1")).is(true)
        assertThat(Eq.string.equals("1", "2")).is(false)
    })

    it("boolean", () => {
        assertThat(Eq.boolean.equals(false, false)).is(true)
        assertThat(Eq.boolean.equals(true, true)).is(true)
        assertThat(Eq.boolean.equals(true, false)).is(false)
    })

    it("date", () => {
        const date1 = new Date(2020, 1, 1)
        const date2 = new Date(2022, 1, 1)
        assertThat(Eq.date.equals(date1, date1)).is(true)
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
})
