import { assertThat } from "mismatched"
import { left, right } from "./constructors"
import { forEach, sequence, traverse } from "./traverse"
import { ArrayM } from "../Array/instance"

describe("either traversable", () => {
    it("forEach", () => {
        assertThat(forEach([1, 2, 3, 4, 5], n => right(n + 1))).is(right([2, 3, 4, 5, 6]))
        assertThat(forEach([1, 2, 3, 4, 5], _ => left("oops"))).is(left("oops"))
    })

    it("sequence", () => {
        assertThat(
            sequence(ArrayM)(
                right([
                    [1, 2, 3],
                    [4, 5]
                ])
            )
        ).is([right([1, 2, 3]), right([4, 5])])
    })

    it("traverse", () => {
        assertThat(traverse(ArrayM)(right(1), n => [n, n])).is([right(1), right(1)])
        assertThat(traverse(ArrayM)(left("oops"), n => [n, n])).is([left("oops")])
    })
})
