import { assertThat } from "mismatched"
import * as fc from "fast-check"
import { map, flatMap } from "../../src/Array"
import { identity, pipe } from "../../src/functions"
import { flatten } from "./map"

describe("map", () => {
    it("identity", () => {
        fc.assert(
            fc.property(fc.array(fc.anything()), arr => {
                assertThat(map(arr, identity)).is(arr)
            })
        )
    })

    it("composition", () => {
        fc.assert(
            fc.property(fc.array(fc.nat()), array => {
                const f = (n: number) => String(n)
                const g = (s: string) => Number(s)

                assertThat(map(array, a => g(f(a)))).is(pipe(array, map(f), map(g)))
            })
        )
    })
})

describe("flatMap", () => {
    it("identity", () => {
        fc.assert(
            fc.property(fc.array(fc.anything()), arr => {
                assertThat(flatMap(arr, a => [identity(a)])).is(arr)
            })
        )
    })

    it("composition", () => {
        fc.assert(
            fc.property(fc.array(fc.nat()), array => {
                const f = (n: number) => String(n)
                const g = (s: string) => Number(s)

                assertThat(flatMap(array, a => [g(f(a))])).is(
                    pipe(
                        array,
                        flatMap(_ => [f(_)]),
                        flatMap(_ => [g(_)])
                    )
                )
            })
        )
    })
})

describe("flatten", () => {
    it("empty", () => {
        assertThat(flatten([])).is([])
    })

    it("mirrors .flat()", () => {
        const arr = [
            [1, 2, 3],
            [4, "5", 6],
            [7, 8, 9, 0]
        ]
        const result = flatten(arr)
        assertThat(result).is(arr.flat())
    })
})
