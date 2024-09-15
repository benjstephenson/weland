import { dual } from "../functions"

export const collect: {
    <K extends string, V, B>(self: Record<K, V>, f: (k: K, v: V) => B): B[]
    <K extends string, V, B>(f: (k: K, v: V) => B): (self: Record<K, V>) => B[]
} = dual(2, <K extends string, V, B>(self: Record<K, V>, f: (k: K, v: V) => B): B[] => {

    const out: B[] = []

    for (const key in self) {
        if (Object.prototype.hasOwnProperty.call(self, key)) {
            out.push(f(key, self[key]))
        }
    }

    return out
})
