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

const percentage = function (a) {
    return a / 100;
}

const sqroot = function (a) {
    return a ** (0.5);
}

const exponentiate = function (a, b) {
    return a ** b;
}

const pi = () => {
    return 3.141592653589793;
}

const operate = function (operator, a, b) {
    switch(operator) {
        case add:
            return add(a, b);
        case subtract:
            return subtract(a, b);
        case multiply:
            return multiply(a, b);
        case divide:
            return divide(a, b);
    }
}

module.exports = {
    add,
    subtract,
    multiply,
    divide,
    percentage,
    sqroot,
    exponentiate,
    pi,
    operate,
  };