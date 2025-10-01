"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let convertibleNumberTypedVariable;
let convertibleNumberInferredVariable = 69;
function randomiser(num1, num2 = 0) {
    let max;
    let min;
    if (num1 > num2) {
        max = num1;
        min = num2;
    }
    else {
        max = num2;
        min = num1;
    }
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function showWhyTypesWork(a, b = 67) {
    const addition = a + b;
    const random = randomiser(a, b);
    return { addition: addition, random: random };
}
showWhyTypesWork(69);
showWhyTypesWork(0, 100);
convertibleNumberTypedVariable = showWhyTypesWork(convertibleNumberInferredVariable).random;
showWhyTypesWork(convertibleNumberInferredVariable, convertibleNumberTypedVariable);
function numberify(stringNum) {
    return +stringNum;
}
let convertibleStringNum = '76';
showWhyTypesWork(numberify(convertibleStringNum));
let convertibleStringNum2;
function gimmeTwoNumbers(stringNum1, stringNum2) {
    return { num1: numberify(stringNum1), num2: numberify(stringNum2) };
}
convertibleStringNum2 = convertibleStringNum;
const convertibleNums = gimmeTwoNumbers(convertibleStringNum, convertibleStringNum2);
showWhyTypesWork(convertibleNums.num1, convertibleNums.num2);
//# sourceMappingURL=example.js.map