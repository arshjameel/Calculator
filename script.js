const keypad = document.querySelector('.keypad');
const topElement = document.querySelector('.top');
const bottomElement = document.querySelector('.bottom');

let firstNumber = '0';
let secondNumber = '0';
let currentOperation = '';
let isFirstNumber = true;
let isSecondNumber = false;
let equalOperation = false;
let isOperation = true;

const mathOperations = ['/', '*', '-', '+', '^'];

keypad.addEventListener('click', (e) => {
    const buttonValue = e.target.textContent.trim();
    
    if (!isNaN(buttonValue) || buttonValue === '.') {
        if (isFirstNumber && !isSecondNumber && isOperation && !equalOperation) {
            if (firstNumber === '0') {
                firstNumber  = buttonValue;
            } else {
                if (buttonValue === '.' && firstNumber.includes('.')) {
                    return;
                }
                firstNumber += buttonValue;
            }
            bottomElement.textContent = firstNumber;
            topElement.textContent = firstNumber;
            isFirstNumber = true;
            isOperation = true;
            isSecondNumber = false;
        }
        
        if (!isFirstNumber && isSecondNumber && isOperation) {
            if (secondNumber === '0') {
                secondNumber = buttonValue
            } else {
                if (buttonValue === '.' && secondNumber.includes('.')) {
                    return;
                }
                secondNumber += buttonValue;
            }
            bottomElement.textContent = secondNumber;
            topElement.textContent = `${firstNumber}${currentOperation}${secondNumber}`;
            isFirstNumber = false;
            isOperation = false;
            isSecondNumber = true;
            equalOperation = true;
        }
    } else {
        if (mathOperations.includes(buttonValue)) {
            if (!isOperation && isSecondNumber && currentOperation) {
                if (firstNumber === '') {
                    firstNumber = '0';
                }
                firstNumber = operate(currentOperation, parseFloat(firstNumber), parseFloat(secondNumber));
                equalOperation = false;
                isOperation = true;
            }

            if (isOperation) {
                currentOperation = buttonValue;
                isFirstNumber = false;
                isOperation = true;
                isSecondNumber = true;
                secondNumber = '';
                topElement.textContent = `${firstNumber}${currentOperation}`;
                bottomElement.textContent = currentOperation;
            }
        }
        
        if (buttonValue === '=' && equalOperation) {
            topElement.textContent = '';
            firstNumber = operate(currentOperation, parseFloat(firstNumber), parseFloat(secondNumber));
            bottomElement.textContent = firstNumber;
            
            isFirstNumber = false;
            isOperation = true;
            isSecondNumber = false;
            equalOperation = false;
        }

        if (buttonValue === 'AC') {
            firstNumber = '';
            secondNumber = '';
            topElement.textContent = '';
            bottomElement.textContent = '0';
            
            isFirstNumber = true;
            isOperation = true;
            isSecondNumber = false;
        }

        if (buttonValue === 'C') {
            let temp = topElement.textContent;
            temp = temp.slice(0, -1);
            topElement.textContent = temp;
            if (temp.includes(currentOperation)) {
                let operationIndex = temp.indexOf(`${currentOperation}`);
                firstNumber = temp.slice(0, operationIndex+1).trim();
                secondNumber = temp.slice(operationIndex, temp.length).trim();
            } else {
                firstNumber = temp.slice(0, temp.length).trim();
                secondNumber = '0';
            }
        }

        if (buttonValue === '+/-') {
            let temp = bottomElement.textContent;
            if (!isOperation) {
                return;
            }
            if (temp.includes('-')) {
                firstNumber = temp.slice(1, temp.length);
                bottomElement.textContent = firstNumber;
            } else {
                firstNumber = `-${temp}`;
                bottomElement.textContent = firstNumber;
            }
        }
    }

})

const add = function (a, b) {
    return a + b;
  };
  
const subtract = function (a, b) {
    return a - b;
  };

const multiply = function (a, b) {
    return a * b;
}

const divide = function (a, b) {
    if (b === 0) {
        if (a === 0) {
            return 'NaN';
        }
        return 'Infinity';
    }
    return a / b;
}

const exponentiate = function (a, b) {
    return a ** b;
}

const operate = function (operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        case '^':
            return exponentiate(a, b);
    }
}

module.exports = {
    add,
    subtract,
    multiply,
    divide,
    exponentiate,
    operate,
  };