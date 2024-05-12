import { dual } from "../functions"
import { isEmpty } from "./instance"

export const split: {
    <A>(self: A[], at: number): [A[], A[]]
    (at: number): <A>(self: A[]) => [A[], A[]]
} = dual(2, <A>(self: A[], at: number): [A[], A[]] => {
    if (isEmpty(self)) return [[], []]
    if (at >= self.length) return [self.slice(), []]
    if (at === 0) return [[], self.slice()]

    return [self.slice(0, at), self.slice(at)]
})
