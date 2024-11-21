import { assertThat } from "mismatched"
import { Sg } from ".."
import { getSemigroup } from "./instance"

describe("Record instances", () => {

    it("getSemigroup", () => {

        const rec1 = {
            name: "Bob",
            age: 31,
        }

        const rec2 = {
            name: "Bob",
            age: 31,
        }

        const sg = getSemigroup<typeof rec1>({
            name: Sg.string,
            age: Sg.number
        })

        assertThat(sg.concat(rec1, rec2)).is({ name: "BobBob", age: 62})
    })
})
