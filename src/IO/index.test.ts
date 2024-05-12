import { assertThat } from "mismatched"

describe("IO", () => {
    it("stuff", () => {
        let out

        const effect = () => {
            new Promise((resolve, reject) => {
                out = 10
            })
        }

        effect()
        assertThat(out).is(10)
    })
})
