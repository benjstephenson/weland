export const isDefined = <A>(a: A): a is Exclude<A, undefined> => a != undefined && a != null
