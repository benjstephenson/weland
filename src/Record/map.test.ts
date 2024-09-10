import { assertThat } from "mismatched"
import { map, mapKV } from "./map"

describe("Record", () => {
    const rec = {
        a: 1,
        b: 2,
        c: 3
    }

    it("maps values", () => {
        assertThat(map(rec, n => n + 1)).is({ a: 2, b: 3, c: 4 })
    })

    it("maps keys and values", () => {
        assertThat(mapKV(rec, (k, n) => `${k}_${n + 1}`)).is({ a: "a_2", b: "b_3", c: "c_4" })
    })
})
