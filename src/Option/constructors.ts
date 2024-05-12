import { Option } from "."
import { isDefined } from "../predicates"

const of = <A>(a: A | undefined): Option<A> => (isDefined(a) ? some(a) : none())

const OptionPrototype = {
    toJSON<A>(this: Option<A>) {
        return this._tag === "some" ? `Some(${JSON.stringify(this.value)})` : "None"
    },

    toString<A>(this: Option<A>) {
        return this._tag === "some" ? `Some(${this.value})` : "None"
    },

    [require("util").inspect.custom]<A>(this: Option<A>) {
        return this.toString()
    }
}

const some = <A>(a: A): Option<A> => {
    return Object.assign(Object.create(OptionPrototype), { _tag: "some", value: a })
}

const none = <A = never>(): Option<A> => Object.assign(Object.create(OptionPrototype), { _tag: "none" })

const tryCatch = <A>(f: () => A): Option<A> => {
    try {
        const result = f()
        return some(result)
    } catch (e) {
        return none()
    }
}

export { of, some, none, tryCatch }
