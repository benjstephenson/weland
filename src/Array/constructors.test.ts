import { assertThat } from "mismatched"
import { make, of, tuple } from "./constructors"
import * as fc from "fast-check"

describe("constructors", () => {
    it("make", () => {
        fc.assert(
            fc.property(fc.array(fc.anything()), array => {
                //@ts-expect-error
                assertThat(make(...array)).is(array)
            })
        )
    })

    it("tuple", () => {
        fc.assert(
            fc.property(fc.array(fc.anything()), array => {
                assertThat(tuple(...array)).is(array)
            })
        )
    })

    it("of", () => {
        fc.assert(
            fc.property(fc.anything(), item => {
                assertThat(of(item)).is([item])
            })
        )
    })
})
