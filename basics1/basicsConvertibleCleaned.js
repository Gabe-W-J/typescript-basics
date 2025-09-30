var convertibleStringTypedVariable;
var convertibleStringInferredVariable = 'hello world';
var convertibleNumberTypedVariable;
var convertibleNumberInferredVariable = 69;

convertibleStringTypedVariable = 'console.log()';

function randomiser(num1, num2) {
    if (num2 === void 0) { num2 = 0; }
    var max;
    var min;
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
function showWhyTypesWork(a, b) {
    if (b === void 0) { b = 67; }
    var addition = a + b;
    var random = randomiser(a, b);
    return { addition: addition, random: random };
}
showWhyTypesWork(69);
showWhyTypesWork(0, 100);

convertibleNumberTypedVariable = showWhyTypesWork(convertibleNumberInferredVariable).random;
showWhyTypesWork(convertibleNumberInferredVariable, convertibleNumberTypedVariable);

function numberify(stringNum) {
    var numberNum = +stringNum;
    return numberNum;
}

var convertibleStringNum = '76';
showWhyTypesWork(numberify(convertibleStringNum));

var convertibleStringNum2;
function gimmeTwoNumbers(stringNum1, stringNum2) {
    return { num1: numberify(stringNum1), num2: numberify(stringNum2) };
}

convertibleStringNum2 = convertibleStringNum;

var convertibleNums = gimmeTwoNumbers(convertibleStringNum, convertibleStringNum2);
showWhyTypesWork(convertibleNums.num1, convertibleNums.num2);
