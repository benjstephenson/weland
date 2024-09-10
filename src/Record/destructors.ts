
export const keys = <K extends string, V>(self: Record<K, V>): K[] => Object.keys(self) as any

export const values = <K extends string | number | symbol, V>(self: Record<K, V>): V[] => Object.values(self)

export const entries = <K extends string, V>(self: Record<K, V>): [K, V][] => Object.entries(self) as [K, V][]
