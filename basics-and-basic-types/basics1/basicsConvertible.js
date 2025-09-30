//* Compile this file and other files via tsc [filename] or an npm run build/npm run [runtime command],
//* the npm commands will JIT compile the typescript for the browser, and not create any files.
var convertibleStringTypedVariable; //* assigned type
var convertibleStringInferredVariable = 'hello world'; //* inferred type
var convertibleNumberTypedVariable; //* assigned type
var convertibleNumberInferredVariable = 69; //* inferred type
//* inherent typescript types also include boolean, array, function, etc etc
convertibleStringTypedVariable = 'console.log()'; //* works because it's a string
//* Inverse applies to the number variables
function randomiser(num1, num2) {
    if (num2 === void 0) { num2 = 0; }
    var max; //* give max and min their number types
    var min;
    if (num1 > num2) {
        max = num1;
        min = num2;
    }
    else {
        max = num2;
        min = num1;
    } //* figure out which is the max and which is the minimum
    return Math.floor(Math.random() * (max - min + 1) + min);
    //* Math.random generates a random decimal between 0 and 1
    //* max - min + 1 calculated the total possible numbers within the range
    //* using both together scales the decimal to cover the size of the range
    //* + min scales the random number so it starts at the desired minimum
    //* Math.floor removes all decimals, so you get a proper number
    //? This is doable in vanilla JS, but having the typing and confirmation of types is really nice.
}
function showWhyTypesWork(a, b) {
    if (b === void 0) { b = 67; }
    //* Both parameters are numbers, ergo if you try to give it anything but a number, typescript will complain
    var addition = a + b;
    var random = randomiser(a, b);
    return { addition: addition, random: random };
}
showWhyTypesWork(69); //* Will add 69 to 67, and will return a random number between 67 and 69, because b is 67 by default
showWhyTypesWork(0, 100); //* Will add 0 to 100, and will return a random number between 0 and 100
//* remember these from earlier?
convertibleNumberTypedVariable = showWhyTypesWork(convertibleNumberInferredVariable).random;
//* This will work because b is set to 67 if you don't give a value for it
//* and it'll give numberTypedVariable the random value from the function, meaning we can start to use it later
showWhyTypesWork(convertibleNumberInferredVariable, convertibleNumberTypedVariable);
//* see? It works now because it's being assigned a value.
//* What if we tried to use a string here?
//* Obviously, most strings will give an error, but if we have a string that's just a number, we can try anyway
function numberify(stringNum) {
    var numberNum = +stringNum;
    //* +stringNum is the same as doing Number(stringNum), just faster.
    //* Doing 'stringNum as number' will just try to type it without actually converting.
    //* parseFloat(stringNum) may work, but floating point inaccuracies and processing overhead make it pretty pointless
    //? Assigning a type and a value at the same time generally isn't great practice,
    //? But if we want to make sure it'll only become a number and not concatenate a string, it's probably a good idea.
    return numberNum;
}
var convertibleStringNum = '76';
showWhyTypesWork(numberify(convertibleStringNum)); //* Now that stringNum is being turned into a number, it'll be accepted just fine.
var convertibleStringNum2;
function gimmeTwoNumbers(stringNum1, stringNum2) {
    return { num1: numberify(stringNum1), num2: numberify(stringNum2) };
}
convertibleStringNum2 = convertibleStringNum; //? Just giving stringNum2 a value
var convertibleNums = gimmeTwoNumbers(convertibleStringNum, convertibleStringNum2);
showWhyTypesWork(convertibleNums.num1, convertibleNums.num2); //* This will work because we've extracted num1 and num2 from gimmeTwoNumbers()
