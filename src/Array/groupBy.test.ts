import { assertThat } from "mismatched"
import { groupBy, groupOn } from "./groupBy"
import { identity } from "../functions"

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

describe("groupOn", () => {

    it("groups a sorted array", () => {
        assertThat(groupOn([2, 2, 1, 2, 4, 4, 3, 6, 5, 6], identity)).is({
            1: [1],
            2: [2, 2, 2],
            3: [3],
            4: [4, 4],
            5: [5],
            6: [6, 6]
        })
    })

    it("groups an array of objects", () => {
        assertThat(
            groupOn(
                [
                    { age: 3, name: "janet" },
                    { age: 1, name: "bob" },
                    { age: 2, name: "bob" },
                    { age: 4, name: "janet" },
                    { age: 3, name: "janet" },
                    { age: 1, name: "bob" },
                    { age: 3, name: "dave" }
                ],
                _ => _.age
            )
        ).is({
            1: [
                { age: 1, name: "bob" },
                { age: 1, name: "bob" }
            ],
            2: [{ age: 2, name: "bob" }],
            3: [
                { age: 3, name: "janet" },
                { age: 3, name: "janet" },
                { age: 3, name: "dave" }
            ],
            4: [{ age: 4, name: "janet" }],
        })
    })
})
