import { compose, filter, run, map, take } from "./transduce"
import { pipe } from "../functions"
import { assertThat } from "mismatched"
import fc from "fast-check"

describe("transduce", () => {

    function* numberGenerator(): Generator<number> {
        let current = 1
        while (true) {
            yield current++
        }
    }

    it("filterMap", () => {
        const a = pipe(
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            run(
                compose(
                    filter(a => a % 2 === 0),
                    map(a => `${a}`),
                    map(a => Number.parseInt(a) + 1),
                    map(a => `${a}`)
                )
            )
        )

        assertThat(a).is(["3", "5", "7", "9", "11"])
    })

    it("filterMap from iterator", () => {
        const a = pipe(
            numberGenerator(),
            run(
                compose(
                    filter(a => a % 2 === 0),
                    map(a => a + 1),
                    map(a => `${a}`),
                    take(5)
                )
            )
        )

        assertThat(a).is(["3", "5", "7", "9", "11"])
    })

    it("take", () => {
        fc.assert(fc.property(fc.integer({ min: 0, max: 1000 }), count => {
            const a = pipe(
                numberGenerator(),
                run(take(count))
            )

            assertThat(a.length).is(count)
        }))
    })
})
