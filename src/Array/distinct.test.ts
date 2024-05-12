import { distinct } from "./distinct"
import * as Ord from "../Order/Orderable"
import * as Eq from "../Order/Equal"
import { assertThat } from "mismatched"

describe("distinct", () => {
    it("numbers", () => {
        const array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 0, 0]
        const result = distinct(array, Ord.number)
        const result2 = distinct(array, Eq.number)
        assertThat(result).is(result2)
        assertThat(result).is([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
    })

    it("strings", () => {
        const array = [
            "1",
            "1",
            "2",
            "2",
            "3",
            "3",
            "4",
            "4",
            "5",
            "5",
            "6",
            "6",
            "7",
            "7",
            "8",
            "8",
            "9",
            "9",
            "0",
            "0"
        ]
        const result = distinct(array, Ord.string)
        const result2 = distinct(array, Eq.string)
        assertThat(result).is(result2)
        assertThat(result).is(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"])
    })

    it("booleans", () => {
        const array = [true, true, false, false, true, false]
        const result = distinct(array, Ord.boolean)
        const result2 = distinct(array, Eq.boolean)
        assertThat(result).is(result2)
        assertThat(result).is([true, false])
    })

    it("custom equality", () => {
        const array = [1, 1, 2, 2, 3, 3]
        const objs = array.map(_ => ({ key: _, foo: "bar", baz: Math.random() }))

        const result = distinct(
            objs,
            Eq.from((x, y) => x.key === y.key)
        )

        const result2 = distinct(
            objs,
            Eq.contramap<number, { key: number; foo: string; baz: number }>(a => a.key, Eq.number)
        )

        assertThat(result).is(result2)
        assertThat(result.length).is(3)
    })
})
