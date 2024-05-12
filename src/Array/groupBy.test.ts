import { assertThat } from "mismatched"
import { groupBy } from "./groupBy"

describe("groupBy", () => {
    it("groups a sorted array", () => {
        assertThat(groupBy([1, 2, 2, 2, 3, 4, 4, 5, 6, 6], (a, b) => a === b)).is([
            [1],
            [2, 2, 2],
            [3],
            [4, 4],
            [5],
            [6, 6]
        ])
    })

    it("groups a sorted array of objects", () => {
        assertThat(
            groupBy(
                [
                    { age: 1, name: "bob" },
                    { age: 1, name: "bob" },
                    { age: 2, name: "bob" },
                    { age: 3, name: "janet" },
                    { age: 4, name: "janet" },
                    { age: 3, name: "janet" },
                    { age: 3, name: "janet" }
                ],
                (a, b) => a.age === b.age && a.name === b.name
            )
        ).is([
            [
                { age: 1, name: "bob" },
                { age: 1, name: "bob" }
            ],
            [{ age: 2, name: "bob" }],
            [{ age: 3, name: "janet" }],
            [{ age: 4, name: "janet" }],
            [
                { age: 3, name: "janet" },
                { age: 3, name: "janet" }
            ]
        ])
    })
})
