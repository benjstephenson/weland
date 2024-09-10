import { assertThat } from "mismatched"
import { keys, values } from "./destructors"

describe("record destructors", () => {

    const rec = {
        a: 1,
        b: 2,
        c: 3
    }

    it("gets keys", () => {
        assertThat(keys(rec)).is(["a", "b", "c"])
    })

    it("gets values", () => {
        assertThat(values(rec)).is([1, 2, 3])
    })
})
