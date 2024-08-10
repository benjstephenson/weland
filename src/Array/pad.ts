

/* Given an array and a desired size, if the array is smaller, return a new array with the missing elements
 * filled using the provided function. If the array is already the desired size then it is returned unmodified.
 *
 * @example
 * padWith([1, 2, 3], 2, () => 10) === [1, 2, 3]
 *
 * padWith([1, 2, 3], 5, () => 10) === [1, 2, 3, 10, 10]
 */
export const padWith = <A>(self: A[], size: number, a: () => A): A[] =>
    self.length < size ? [...self.slice(), ...new Array(size - self.length).fill(a())]
        : self


/* Given an array and a desired size, if the array is smaller, return a new array with the missing elements
 * set to `undefined`. If the array is already the desired size then it is returned unmodified.
 *
 * @example
 * pad([1, 2, 3], 2) === [1, 2, 3]
 *
 * pad([1, 2, 3], 5) === [1, 2, 3, undefined, undefined]
 */

export const pad = <A>(self: A[], size: number): (A | undefined)[] => padWith(self, size, () => undefined)
