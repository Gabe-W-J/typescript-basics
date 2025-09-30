//* Enums:
enum enumerator {
    value1 = 'hello', //* By default, the values are numbers counting up, starting from zero
    value2 = '.world', //* If you were to set value1 to 1, it would count up from 1
    value3 = '(print)', //* If you set one as a string, all of them have to be set as strings
}

//let usage: enumerator = 0; //! This doesnt work because enumerator doesnt have a zero value
let usage: enumerator = enumerator.value1
let usage2: enumerator = enumerator.value2;
let usage3 = enumerator.value3;

let usageArray: (enumerator)[] = [usage, usage2, usage3]

// console.log(JSON.stringify(usageArray)) //? This will end up printing '["hello",".world","(print)"]'

let textUsages = '';

for (const key in usageArray) {
    textUsages+=usageArray[key]
}

console.log(textUsages) //* This will end up printing 'hello.world(print)'

//* Due to enums being specific to typescript, compiling this code actually makes it look quite
//* strange in vanilla javascript, like so:

//? var compiledEnumerator;
//? (function (compiledEnumerator) {
//?     compiledEnumerator["value1"] = "hello"; 
//?     compiledEnumerator["value2"] = ".world"; 
//?     compiledEnumerator["value3"] = "(print)";
//! These three lines above funnily enough error out in this .ts file
//! if left uncommented
//? })(compiledEnumerator || (compiledEnumerator = {}));

//? var compiledUsage = compiledEnumerator.value1;
//? var compiledUsage2 = compiledEnumerator.value2;
//? var compiledUsage3 = compiledEnumerator.value3;
//? var compiledUsageArray = [compiledUsage, compiledUsage2, compiledUsage3];
//? console.log(JSON.stringify(compiledUsageArray)); 


//* The popular alternative to enums
//* i.e union literal types
//* (I accidentally did that myself earlier lol)
//? basics2.ts line 69 (nice)

let literalEnum: 'hello' | '.world' | '(print)'
let literalUsage1: typeof literalEnum = 'hello'
let literalUsage2: typeof literalEnum = '.world'
let literalUsage3: typeof literalEnum = '(print)'

let literalUsageArray: Array<typeof literalEnum>
// or (typeof literalEnum)[]
literalUsageArray = [literalUsage1, literalUsage2, literalUsage3]

let literalTextUsages = '';

for (const key in literalUsageArray) {
    literalTextUsages+=literalUsageArray[key]
}

console.log(literalTextUsages) //* This will end up printing 'hello.world(print)'

//* Same as before, just written differently.

//* Of course, also doable in tuples
let newBinary: [0 | 1, 1 | 0]; //* This can be any two number combination of 0s and 1s now
newBinary = [1, 0] //* 1 is NOW assignable to 0 and 0 is NOW assignable to 1 (because they're now 0 | 1 and 1 | 0)
newBinary = [0, 1]

//? Notice how earlier i defined let literalEnum and then used typeof?
//* Well that can be done better, by just defining the type yourself

type typedEnum = 'hello' | '.world' | '(print)'

let typedUsage1: typedEnum = 'hello'
let typedUsage2: typedEnum = '.world'
let typedUsage3: typedEnum = '(print)'

let typedUsageArray: Array<typedEnum>
// or (typeof literalEnum)[]
typedUsageArray = [typedUsage1, typedUsage2, typedUsage3]

let typedTextUsages = '';

for (const key in typedUsageArray) {
    typedTextUsages+=typedUsageArray[key]
}

console.log(typedTextUsages) //* This will end up printing 'hello.world(print)'

//* Same as before, just written differently (again).

//* For long, complex, types that should not be repeated, being able to define your own
//* types is very powerful and should be used when possible.
//* Of course, you can also nest types like so:

type ObjectType = {
    enum: enumerator, //* Can be enumerator. value1, value2, value3 or their actual values
    literal: typeof literalEnum, //* Can be 'hello' or '.world' or '(print)'
    typed: typedEnum //* Same as above, just in a cleaner package
}

//* And usage would look like so:
let basics4Object: ObjectType = {
    enum: enumerator.value1,
    literal: literalUsage1,
    typed: typedUsage1
}

let basics4Object2: ObjectType = {
    enum: literalUsage1, //! This doesn't work because despite the value being the same,
    //! because the input is not an enum key, and type restrictions identify that.
    literal: typedUsage1, //* This works, because all it's looking for is something with a value that matches its type
    typed: enumerator.value1 //* This also works for the same reason.
}