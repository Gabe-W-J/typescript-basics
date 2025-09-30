//* null & undefined as Types

let a: null; //* a is typed to null, and therefore can only be set to null
a = null; //* As expected, setting a to null works
a = 'not null'; //! Type error, because unsurprisingly, a string saying 'not null' isn't null

//* null might not seem useful at first, considering it means nothing,
//* but if you had it in a union type, it can be pretty handy

let b: null | string; //* Union Type
b = null; //* Can be set to null, like before
b = 'not null'; //* But now it can be set to a string

let c: undefined | string; //* It's important to note that undefined is NOT null, and vice versa
c = null; //! Ergo, setting it to null won't work
c = 'not null'; //* Again works as intended
c = undefined; //* And yeah, this works

//* These functionalities are not unique to typescript, at least in the concept of undefined and null
//* not meaning the same thing.

//* Inferred nulls/undefineds

const canBeNull = document.getElementById('') //? This isn't to be linked to a file, it's just a proof of concept

console.log(canBeNull.className) //! Notice how this is an error because it can be null?


//* There's ways we can prevent this from happening, in order to not cause errors, like so:

//* Solution 1: Explicit If statement

let cantBeNull: string;

if (!canBeNull) { //* !canBeNull is the same as canBeNull !== null
    cantBeNull = 'null' //* This is a string of the word null, don't worry
}
else {
    cantBeNull = canBeNull.className
}

console.log(cantBeNull) //* See? No problems anymore

//? Please note that these other solutions are not covered at the same time as prior topics

//* Solution 2: Inline conditional check

let cantBeNullElement: HTMLElement
cantBeNullElement = canBeNull ?? new HTMLElement //* If canBeNull is null, use a new HTMLElement instead!
//? The ?? is called the nullish coalescing operator (This isn't covered by the course up to this point)
cantBeNull = cantBeNullElement.className

console.log(cantBeNull)

//* Solution 3: Check directly on the item itself

cantBeNull = canBeNull?.className || ''
//? Adding ? before a property call means only check for this property if canBeNull isn't null
//? The || (or) operator is added so that it can never return null

console.log(cantBeNull)

//* And of course, we could do the same comparison inside the log itself, skipping a variable entirely

console.log(canBeNull?.className || '')

//* Solution 4: Tertiary Operator ('kind of' advanced, don't waste your time on this if you dont fully understand)
cantBeNull = canBeNull ? canBeNull.className : ''

//* To break down this operator, it's like so:
//? is CanBeNull null ? No = canBeNull.classname : Yes = ''

//* Where ? is 'is [value] null?' and the precursor to the no value
//* And : is the precursor to the yes value