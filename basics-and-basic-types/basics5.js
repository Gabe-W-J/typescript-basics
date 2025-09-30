//* Typing Function Return Values
//* We've already slightly covered this in regards to implicit and inferred types to function parameters
function inferredParams(a, b) {
    if (a === void 0) { a = ''; }
    if (b === void 0) { b = ''; }
    return "".concat(a, " ").concat(b);
}
function typedParams(a, b) {
    return "".concat(a, " ").concat(b);
}
function mixedParams(a, b) {
    if (b === void 0) { b = ''; }
    return "".concat(a, " ").concat(b);
}
//* But now we're going to type what the function is actually returning, like so:
function typedReturn(a, b) {
    return "".concat(a, " ").concat(b); //* This is a string, so it satisfies the return type
}
function lengthTypedReturn(a, b) {
    return "".concat(a, " ").concat(b).length; //* Of course, the return type doesn't have to be the same as the parameter types, so this works too!
}
//* However, typescript will infer the return type depending on what you return
function inferredTypeReturn(a, b) {
    return "".concat(a, " ").concat(b);
    //* Notice how if you hover over inferredTypeReturn, it actually says
    //* 'function inferredTypeReturn(a: string, b: string): string'?
}
//* The void return type:
function returnsNothing(input) {
    console.log(input); //* so implicitly it is of type void
}
//* Of course, you can explicitly type it like so:
function explicitReturnsNothing(input) {
    console.log(input);
}
//? Note that void is NOT a valid type for anything other than a function,
//? and it isn't interchangeable with null or undefined
var functionType;
//? Only reason this isn't erroring out is because it can be set to a function in future i.e:
functionType = function () {
    return;
};
//? But if you tried this?
var voidType;
//? Done like this because making a type for a non-union type is useless
function returnsVoidOrFunction(input) {
    console.log(input);
    if (input === "gimme function") {
        return functionType;
    }
}
//? Applying multiple concepts like so can really expand your horizons and understanding of the TypeScript
//? language, and I recommend you do it yourself (to whoever's reading this)
//* The never type
function thisWillError(input) {
    throw new Error(input);
}
function isNever(input) {
    throw new Error(input);
}
//* Functions as types
//? Like I did earlier, you can always type your functions, and then have a function that expects a function.
function useFunction(func) {
    //* a function that returns nothing, or a function that returns string
    // func() //! Notice this errors because void isn't a function
    if (typeof func !== "function") {
        throw new Error("func is of type void / isn't a function");
    }
    var funcReturn = func(); //* See how this works? func now won't error because it'll always be a function
    if (typeof funcReturn === "undefined") {
        return 404;
    }
    return funcReturn;
    //? Notice how after all this, the return type is string | 404?
    //? We could always explicitly type it just to have a number return too.
}
//* Now we could use that function like so:
useFunction(returnsVoidOrFunction(""));
//* Of course, that was a bit overcomplicated, but hopefully it got the point across.
//* You can also type the INPUTS to a function parameter
function useStringInputFunction(func, input) {
    func(input);
}
//* So if we did this:
useStringInputFunction(returnsVoidOrFunction, ""); //* Works fine, because we gave it a function that has a parameter of string and a string
useStringInputFunction(console.log, "Hello!"); //* This would do the same, and actually run console.log("Hello!")
//* So making a variable with this type would look something like this:
var object = {
    value1: '',
    value2: 2,
    func: functionType
};
var Print = "print";
var hello = {
    descriptor: "hello.world",
    world: function (input) {
        console.log("".concat(this.descriptor, "(").concat(input, ")")); //* This will return 'hello.world(print)'
    }
};
hello.world(Print); //* Here, we're calling the object, its world property, and passing the Print variable which is "print"
