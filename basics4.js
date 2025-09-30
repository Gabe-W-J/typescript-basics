//* Enums:
var enumerator;
(function (enumerator) {
    enumerator["value1"] = "hello";
    enumerator["value2"] = ".world";
    enumerator["value3"] = "(print)";
})(enumerator || (enumerator = {}));
//let usage: enumerator = 0; //! This doesnt work because enumerator doesnt have a zero value
var usage = enumerator.value1;
var usage2 = enumerator.value2;
var usage3 = enumerator.value3;
var usageArray = [usage, usage2, usage3];
// console.log(JSON.stringify(usageArray)) //? This will end up printing '["hello",".world","(print)"]'
var textUsages = '';
for (var key in usageArray) {
    textUsages += usageArray[key];
}
console.log(textUsages); //* This will end up printing 'hello.world(print)'
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
var literalEnum;
var literalUsage1 = 'hello';
var literalUsage2 = '.world';
var literalUsage3 = '(print)';
var literalUsageArray;
// or (typeof literalEnum)[]
literalUsageArray = [literalUsage1, literalUsage2, literalUsage3];
var literalTextUsages = '';
for (var key in literalUsageArray) {
    literalTextUsages += literalUsageArray[key];
}
console.log(literalTextUsages); //* This will end up printing 'hello.world(print)'
//* Same as before, just written differently.
//* Of course, also doable in tuples
var newBinary; //* This can be any two number combination of 0s and 1s now
newBinary = [1, 0]; //* 1 is NOW assignable to 0 and 0 is NOW assignable to 1 (because they're now 0 | 1 and 1 | 0)
newBinary = [0, 1];
var typedUsage1 = 'hello';
var typedUsage2 = '.world';
var typedUsage3 = '(print)';
var typedUsageArray;
// or (typeof literalEnum)[]
typedUsageArray = [typedUsage1, typedUsage2, typedUsage3];
var typedTextUsages = '';
for (var key in typedUsageArray) {
    typedTextUsages += typedUsageArray[key];
}
console.log(typedTextUsages); //* This will end up printing 'hello.world(print)'
//* Same as before, just written differently (again).
//* For long, complex, types that should not be repeated, being able to define your own
//* types is very powerful and should be used when possible.
