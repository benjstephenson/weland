import { dual } from "../functions"

export const mapKV: {
    <K extends string, V, B>(self: Record<K, V>, f: (k: K, v: V) => B): Record<K, B>
    <K extends string, V, B>(f: (k: K, v: V) => B): (self: Record<K, V>) => Record<K, B>
} = dual(2, <K extends string, V, B>(self: Record<K, V>, f: (k: K, v: V) => B): Record<K, B> => {

    const out: Record<K, B> = {} as any

    for (const key in self) {
        if (Object.prototype.hasOwnProperty.call(self, key)) {
            out[key] = f(key, self[key])
        }
    }

    return out
})

export const map: {
    <K extends string, V, B>(self: Record<K, V>, f: (v: V) => B): Record<K, B>
    <K extends string, V, B>(f: (v: V) => B): (self: Record<K, V>) => Record<K, B>
} = dual(2, <K extends string, V, B>(self: Record<K, V>, f: (v: V) => B): Record<K, B> => mapKV(self, (_, v) => f(v)))

