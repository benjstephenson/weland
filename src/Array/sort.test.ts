import * as fc from "fast-check"
import { sort, sortWith } from "./sort"
import * as Ord from "../Order/Orderable"
import { assertThat } from "mismatched"

describe("sort", () => {
    const verify = (result: any[]) => {
        let before = 0
        for (let i = 1; i < result.length; i++) {
            assertThat(result[before] <= result[i]).is(true)
            before++
        }
    }

    it("numeric", () => {
        fc.assert(
            fc.property(fc.array(fc.nat()), array => {
                const result = sort(array, Ord.number)
                verify(result)
            })
        )
    })

    it("string", () => {
        fc.assert(
            fc.property(fc.array(fc.string()), array => {
                const result = sort(array, Ord.string)
                verify(result)
            })
        )
    })

    it("boolean", () => {
        fc.assert(
            fc.property(fc.array(fc.boolean()), array => {
                const result = sort(array, Ord.boolean)
                verify(result)
            })
        )
    })

    it("date", () => {
        fc.assert(
            fc.property(fc.array(fc.date()), array => {
                const result = sort(array, Ord.date)
                verify(result)
            })
        )
    })

    it("sortWith", () => {
        fc.assert(
            fc.property(fc.array(fc.nat()), array => {
                const reversed = array.toReversed()
                const objs = array.map((a, idx) => ({ sortKey: a, otherKey: reversed[idx] }))

                const result = sortWith(objs, f => f.sortKey, Ord.number)
                verify(result)

                let before = 0
                for (let i = 1; i < result.length; i++) {
                    assertThat(result[before].sortKey <= result[i].sortKey).is(true)
                    before++
                }
            })
        )
    })

    it("sort with contramap", () => {
        fc.assert(
            fc.property(fc.array(fc.nat()), array => {
                const reversed = array.toReversed()
                const objs = array.map((a, idx) => ({ sortKey: a, otherKey: reversed[idx] }))

                const ord = Ord.contramap<number, { sortKey: number; otherKey: number }>(f => f.sortKey, Ord.number)
                const result = sort(objs, ord)
                verify(result)

                let before = 0
                for (let i = 1; i < result.length; i++) {
                    assertThat(result[before].sortKey <= result[i].sortKey).is(true)
                    before++
                }
            })
        )
    })
})
