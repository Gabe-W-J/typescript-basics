//* Let and const keywords

//* This is a constant (const)
const constant = "value"
//? A constant cannot be changed after it's inital value
// constant = "" //! Not allowed

//* This is a let, let is a variable.
let variable = "value"
variable = "value2" //* This CAN be changed at any point

//? Why not use var?

//* Var has a different scope system to let, where let has a global and function scope
//* (i.e can be seen by your entire program or just one function)
//* var is just scoped globally no matter where it's initialised.

//* Note that when it comes to scopes, you can always access values of a higher scope, but not of a lower scope f.e:

let global = "This is a globally scoped variable"

function example(a: string, b: string): string {
    global = `${a} ${b}` //* This function can access global
    return global;
}

console.log(global); //* This will print `${a} {b}`

function example2(a: string, b: string): string {
    var local;
    local = `${a} ${b}`
    return local;
}

// console.log(local) //! This just won't work because local isnt defined outside of the function scope

//* Note that when using vars, it's registered globally no matter what.
//* The typescript compiler will act as if vars are lets, but if you were to copy paste example2 and the console log into
//* the browser, you'd note that it works fine.

//* If you wanted to implement something like that correctly in TypeScript, you'd do something like this:

let example3Val: string;

function example3Function(a: string, b: string) {
    return `${a} ${b}`;
}

example3Val = example3Function("example", "three")

console.log(example3Val) //* Will print "example three"


//* Arrow functions

const arrowFuncEx = () => {
    //* This is an arrow function. It is initialised by the use of () =>.
    //* [the brackets are where the inputs go and after them you put the type of the output, like usual]
    //* The only real difference is the usage of =>
    //* This is a clean replacement for the function keyword that we've been using so far.
}

const arrowFunc = (a: string, b: string): string => { //* This works EXACTLY the same as 'example3Function'
    return `${a} ${b}`;
}

//* If you only have one expression in your function, you can actually remove the curly brackets and the return keyword like so:
const arrowFuncNoBraces = (a: string, b: string): string => `${a} ${b}`; //* This works the same as arrowFunc, but instead is one line.

//* It is limited to exclusively one expression though.

//* Typing the arrow function to decrease value typing.
//* Another way you can type your arrow functions is like this:

const arrowFuncTyped: (input: string) => void = input => console.log(input)

//* This function is typed to accept an input of string and is a void function (i.e returns nothing)
//* But notice how input after the type declaration isnt in brackets, nor has an explicit type, and neither is the output.

//* Side note: When making arrow functions that return nothing, explicitly type your functions for readability e.g:
const arrowFuncEx2 = (): void => {};

//* Convenient uses for arrow functions that are typed seperately is when typing is already done for us by the libraries f.e:
const btn = document.querySelector('button')

if (btn) {
    btn.addEventListener('click', event => console.log(event)) //* Event is already typed to PointerEvent, so why type it ourselves?
}

//* Default function parameters (pretty simple)

const funcWithDefaults = (a: number, b: number = 2) => a + b; //* Only main thing is that default arguments have to be last in the arguments list

funcWithDefaults(5) //* :)

//* The spread operator:

//* This is an array
const array1 = ['1', '2'];

//* This is a second array

const array2 = ['3']

//* We cant do array1.push(array3) to get a full array of all 3 because we'll just be adding the full array into it.
//* So instead we can do this!

array1.push(...array2) //* The ... is the spread operator :)
//* It's pointing at array2 and telling javascript to pull out all the elements of the array and add the list to array1

//* This is a list that  you can put anywhere f.e
const array3 = [...array1, ...array2];

//* This works on objects too! f.e:

const obj1 = {
    value1: 'value',
    value2: 'value2'
}

const obj2 = { ...obj1 } //* This makes obj2 a copy of the object, rather than a pointer to the object in memory.

//* REST Parameters

const restFunc = (...input: number[]): number => {
    //* We want this function to use as many values as the user wants,
    //* so we use the spread operator with a correct array type to be able to pass any length of parameters
    return input.reduce((curResult, curValue) => {
        return curResult + curValue
    }, 0) //* This will return all the input numbers added :D
};

//* You can also use tuple types here to limit the count:

const restTupleFunc = (...input: [number, number, number]): string => {
    const val = input.reduce((curResult, curValue) => {
        return curResult + curValue
    }, 0) 
    return `Total: ${val}`
}

//* This does the same and just returns a string.

//* Array destructuring
//* We can't destructure arrays by just doing const * = array[i], we'll flood our code
//* So instead we can do this:

const [destructuredVal1, destructuredVal2, ...otherDestructuredVals] = array1;

//* this will save destructuredVal1 as array1[1], destructuredVal2 as array1[2] and so on and so forth :)

//* Of course, this works with objects too!

const { value1, value2 } = obj2

//* Note that array destructuring pulls out each value in order, but when destructuring objects you have to pull them
//* out by their key, you can't destructure as something else without adding a specific name for it

const { value1: globalValue1, value2: globalValue2 } = obj2

//* This is JS Syntax, NOT TypeScript type assignment.