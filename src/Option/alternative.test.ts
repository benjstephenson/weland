import { assertThat } from "mismatched"
import { getOrElse, getOrUndefined, orElse } from "./alternative"
import { none, of } from "./constructors"

describe("option alternative", () => {
    it("getOrElse", () => {
        assertThat(getOrElse(of(1), () => 2)).is(1)
        assertThat(getOrElse(none(), () => 2)).is(2)
    })

    it("getOrUndefined", () => {
        assertThat(getOrUndefined(of(1))).is(1)
        assertThat(getOrUndefined(none())).is(undefined)
    })

    it("orElse", () => {
        assertThat(orElse(of(1), () => of(2))).is(of(1))
        assertThat(orElse(none(), () => of(2))).is(of(2))
    })
})
