//* Typing Function Return Values
//* We've already slightly covered this in regards to implicit and inferred types to function parameters

function inferredParams(a = '', b = '') { //* Both parameters are of type string due to defaulting to ''
    return `${a} ${b}`
}

function typedParams(a: string, b: string) { //* Both parameters are of type string because we made it so
    return `${a} ${b}`
}

function mixedParams(a: string, b = '') { //* Both parameters are of type string because one is inferred and the other is explicitly typed
    return `${a} ${b}`
}

//* But now we're going to type what the function is actually returning, like so:

function typedReturn(a: string, b: string): string {
    return `${a} ${b}` //* This is a string, so it satisfies the return type
}

function badTypedReturn(a: string, b: string): number {
    return `${a} ${b}` //! See how this gives an error?
}

function lengthTypedReturn(a: string, b: string): number {
    return `${a} ${b}`.length //* Of course, the return type doesn't have to be the same as the parameter types, so this works too!
}

//* However, typescript will infer the return type depending on what you return

function inferredTypeReturn(a: string, b: string) {
    return `${a} ${b}`
    //* Notice how if you hover over inferredTypeReturn, it actually says
    //* 'function inferredTypeReturn(a: string, b: string): string'?
}


//* The void return type:

function returnsNothing(input: string) { //* This function doesn't return anything and never will,
    console.log(input)                   //* so implicitly it is of type void
}

//* Of course, you can explicitly type it like so:

function explicitReturnsNothing(input: string): void {
    console.log(input)
}

//? Note that void is NOT a valid type for anything other than a function,
//? and it isn't interchangeable with null or undefined

let functionType: () => void

//? Only reason this isn't erroring out is because it can be set to a function in future i.e:

functionType = () => {
    return
}

//? But if you tried this?

let voidType: void

voidType = { //! It's an object, so that's a no go 
}

voidType = () => { //! A function isn't void, it just returns void
}

//* So the only time it's applicable is like so:

type typedVoid = void | (() => void) //* So this would either return nothing or a function that returns nothing
//? Done like this because making a type for a non-union type is useless

function returnsVoidOrFunction(input: string): typedVoid {
    console.log(input)
    if (input === "gimme function") {
        return functionType
    }
}

//? Applying multiple concepts like so can really expand your horizons and understanding of the TypeScript
//? language, and I recommend you do it yourself (to whoever's reading this)


//* The never type

function thisWillError(input: string) { //* This actually has a return type of void, butttt...
    throw new Error(input);
}

function isNever(input: string): never { //* This will never finish because an error is being thrown
    throw new Error(input)
    return '' //! This will never be reached
}

//* Functions as types
//? Like I did earlier, you can always type your functions, and then have a function that expects a function.

function useFunction(func: typedVoid | (() => string)) { //* So the input function can return void,
    //* a function that returns nothing, or a function that returns string

    // func() //! Notice this errors because void isn't a function
    if (typeof func !== "function") {
    throw new Error("func is of type void / isn't a function");
    }
    const funcReturn = func() //* See how this works? func now won't error because it'll always be a function
    if (typeof funcReturn === "undefined") {
        return 404;
    }
    return funcReturn

    //? Notice how after all this, the return type is string | 404?
    //? We could always explicitly type it just to have a number return too.
}

//* Now we could use that function like so:

useFunction(returnsVoidOrFunction(""))

//* Of course, that was a bit overcomplicated, but hopefully it got the point across.
//* You can also type the INPUTS to a function parameter

function useStringInputFunction(func: (x: string) => void, input: string) {
    func(input)
}

//* So if we did this:
useStringInputFunction(returnsVoidOrFunction, "") //* Works fine, because we gave it a function that has a parameter of string and a string
useStringInputFunction(console.log, "Hello!") //* This would do the same, and actually run console.log("Hello!")

//* However:
useStringInputFunction(useFunction, "")
//! Notice how this one errors, because it doesn't have a string as an input

//* We can also use functions as parts of types:

type ObjectWithFunc = {
    value1: string;
    value2: number;
    func: () => void
}

//* So making a variable with this type would look something like this:

let object: ObjectWithFunc = {
    value1: '',
    value2: 2,
    func: functionType
}

//* Now that's a function we made before, but we can also write new functions in here

type HelloWorld = {
    descriptor: string,
    world: (input: string) => void
    //* Objects of type HelloWorld will expect world to have a function with a string input and an output of void
    //* As well as a string for descriptor
}

const Print = "print"

const hello: HelloWorld = { //* We typed the hello object to the HelloWorld type
    descriptor: "hello.world",
    world(input: string) { //* And we made world the exact type of function it was asking for
        console.log(`${this.descriptor}(${input})`) //* This will return 'hello.world(print)'
    }
}

hello.world(Print) //* Here, we're calling the object, its world property, and passing the Print variable which is "print"