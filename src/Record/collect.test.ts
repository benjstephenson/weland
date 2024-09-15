import { assertThat } from "mismatched"
import { collect } from "./collect"
import { identity } from "../functions"

describe("Record collect", () => {
    const rec = {
        a: 1,
        b: 2,
        c: 3
    }

    it("returns an array", () => {
        assertThat(collect({}, identity)).is([])
        assertThat(collect(rec, (_, v) => v + 1)).is([2, 3, 4])
        assertThat(collect(rec, (k, v) => `${k}_${v}`)).is(["a_1", "b_2", "c_3"])
    })

})
