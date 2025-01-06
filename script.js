const keypad = document.querySelector('.keypad');
const topElement = document.querySelector('.top');
const bottomElement = document.querySelector('.bottom');
const mathOperations = ['/', '*', '-', '+', '^'];

let firstNumber = '0';
let secondNumber = '0';
let currentOperation = '';
let isFirstNumber = true;
let isSecondNumber = false;
let equalOperation = false;
let isOperation = true;

function updateNumbers(number, input) {
    return (number === '0' && input !== '.') ? input : number + input;
};

function handleNumberInput(buttonValue) {
    if (isFirstNumber) {
        if (buttonValue === '.' && firstNumber.includes('.')) {
            return;
        };
        firstNumber = updateNumbers(firstNumber, buttonValue);
        bottomElement.textContent = firstNumber;
        topElement.textContent = firstNumber;
    } else if (isSecondNumber) {
        if (buttonValue === '.' && secondNumber.includes('.')) {
            return;
        };
        secondNumber = updateNumbers(secondNumber, buttonValue);
        bottomElement.textContent = secondNumber;
        topElement.textContent = `${firstNumber}${currentOperation}${secondNumber}`;
    };
};

function handleOperationInput(buttonValue) {
    if (!isOperation && isSecondNumber && currentOperation) {
        firstNumber = operate(currentOperation, parseFloat(firstNumber), parseFloat(secondNumber)).toString();
    };
    secondNumber = '';
    currentOperation = buttonValue;
    bottomElement.textContent = currentOperation;
    topElement.textContent = `${firstNumber}${currentOperation}`;  
    isFirstNumber = false;
    isOperation = true; // go into operation mode
    isSecondNumber = true; // expect next number/value
};

function handleEqualInput() {
    if (secondNumber === '') {
        secondNumber = '0';
    };
    firstNumber = operate(currentOperation, parseFloat(firstNumber), parseFloat(secondNumber)).toString();
    if(firstNumber.length > 6) { // prevent text overflow
        firstNumber = firstNumber.substring(0, 6);
        bottomElement.textContent = firstNumber;
    } else {
        bottomElement.textContent = firstNumber;
    };
    topElement.textContent = '';
    resetForNewCalculation();  
};

function resetForNewCalculation() {
    isSecondNumber = false;
    equalOperation = false;
    isOperation = true; // Allow new operations
};

function handleClearAll() {
    firstNumber = '';
    secondNumber = '';
    bottomElement.textContent = '0';
    topElement.textContent = '';
    isFirstNumber = true;
    isSecondNumber = false;
    isOperation = true;
    equalOperation = false; // Reset all states
};

function handleClear() {
    let temp = topElement.textContent.slice(0, -1);
    topElement.textContent = temp;
    if (temp.includes(currentOperation)) {
        const operationIndex = temp.indexOf(currentOperation);
        firstNumber = temp.slice(0, operationIndex).trim();
        secondNumber = temp.slice(operationIndex + 1).trim();
        bottomElement.textContent = secondNumber || '0'; // display "0" if there is an empty string
    } else {
        firstNumber = temp.trim() || '0';
        secondNumber = '0';
        bottomElement.textContent = firstNumber;
    };
};

function handlePi() {
    const piValue = Math.PI.toFixed(6); // Limit to 6 decimal places
    if (isFirstNumber) {
        firstNumber = (firstNumber === '0' ? piValue : firstNumber*piValue);
        bottomElement.textContent = firstNumber;
        topElement.textContent = firstNumber;
    } else if (isSecondNumber) {
        secondNumber = (secondNumber === '0' ? piValue : secondNumber*piValue);
        bottomElement.textContent = secondNumber;
        topElement.textContent = `${firstNumber}${currentOperation}${secondNumber}`;
    }
    isOperation = false;
    equalOperation = true;
};

function displayPi() {
    document.getElementById('display').textContent += PI_SYMBOL;
};
  
function evaluateExpression(expression) {
    // Replace π symbol with its numerical value
    let parsedExpression = expression.replace(PI_SYMBOL, PI_VALUE);
    return eval(parsedExpression);
};

function handleButtonPress(e) {
    e.preventDefault(); // prevent the default behavior of the event
    const buttonValue = e.target.textContent.trim(); // parse input value
    if (!isNaN(buttonValue) || buttonValue === '.') {
        handleNumberInput(buttonValue);
        equalOperation = true; // move to equal operation since we have numbers
        isOperation = false; // reset operation state
    } else if (mathOperations.includes(buttonValue)) {
        handleOperationInput(buttonValue);
    } else if (buttonValue === '=' && equalOperation) {
        handleEqualInput();
    } else if (buttonValue === 'AC') {
        handleClearAll();
    } else if (buttonValue === 'C') {
        handleClear();
    } else if (buttonValue === 'π') {
        handlePi();
    };
};

const add = function (a, b) { return a + b; };  
const subtract = function (a, b) { return a - b; };
const multiply = function (a, b) { return a * b; };
const divide = function (a, b) { return (b === 0 ? (a === 0 ? 'NaN' : 'Infinity') : a / b); };
const exponentiate = function (a, b) { return a ** b; };
const operate = function (operator, a, b) {
    switch(operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        case '^': return exponentiate(a, b);
    }
}

keypad.addEventListener('click', handleButtonPress);
keypad.addEventListener('touchend', handleButtonPress);