import * as fc from "fast-check"
import { dual, identity, pipe } from "./functions"
import { assertThat } from "mismatched"

const double = (x: number) => x * 2

describe("pipe", () => {
    assertThat(pipe(2)).is(2)
    assertThat(pipe(2, double)).is(4)
    assertThat(pipe(2, double, double)).is(8)
    assertThat(pipe(2, double, double, double)).is(16)
    assertThat(pipe(2, double, double, double, double)).is(32)
    assertThat(pipe(2, double, double, double, double, double)).is(64)
    /* @ts-expect-error */
    assertThat(pipe(2, double, double, double, double, double, double)).is(128)
})

describe("identity", () => {
    fc.assert(
        fc.property(fc.anything(), x => {
            const result = identity(x)

            if (x == null || x == undefined) assertThat(result).is(x)

            assertThat(result).is(x)
        })
    )
})

describe("dual", () => {
    it("throws for arity < 2", () => {
        assertThat(() => dual(0, () => {})).throws()
        assertThat(() => dual(1, _ => {})).throws()
    })
})
