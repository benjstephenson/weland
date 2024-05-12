import { assertThat } from "mismatched"
import { none, of, some } from "./constructors"
import { forEach, sequence, traverse } from "./traverse"
import { ArrayM } from "../Array/instance"

describe("option traversable", () => {
    it("forEach", () => {
        assertThat(forEach([1, 2, 3, 4, 5], n => of(n + 1))).is(some([2, 3, 4, 5, 6]))
        assertThat(forEach([1, 2, 3, 4, 5], _ => none())).is(none())
    })

    it("sequence", () => {
        assertThat(
            sequence(ArrayM)(
                of([
                    [1, 2, 3],
                    [4, 5]
                ])
            )
        ).is([of([1, 2, 3]), of([4, 5])])
    })

    it("traverse", () => {
        assertThat(traverse(ArrayM)(of(1), n => [n, n])).is([of(1), of(1)])
        assertThat(traverse(ArrayM)(none(), n => [n, n])).is([none()])
    })
})
