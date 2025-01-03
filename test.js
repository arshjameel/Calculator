function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

function it(description, testFunction) {
  try {
    testFunction();
    console.log(`|\x1b[32m \u2713 Passed: ${description}\x1b[0m`);
  } catch (error) {
    console.error(`|\x1b[31m \u2717 Failed: ${description}\x1b[0m`); // error color made red for consistency only. not needed.
    console.error(error.message);
  }
}

// Import the functions to test
const calculator = require('./script');

console.log('┌────────────────────────────────────────┐');
console.log('| Add                                    |');
console.log('└────────────────────────────────────────┘');


it(`Expected: 0, Got: ${calculator.operate(calculator.add, 0,0)}`, () => {
  assert(calculator.operate(calculator.add, 0, 0) === 0, "add(0,0) !== 0");
});

it(`Expected: 8, Got: ${calculator.operate(calculator.add, 2,6)}`, () => {
  assert(calculator.operate(calculator.add, 2, 6) === 8, "add(2, 6) !== 8");
});

it(`Expected: -3, Got: ${calculator.operate(calculator.add, -1,-2)}`, () => {
  assert(calculator.operate(calculator.add, -1, -2) === -3, "add(-1, -2) !== -3");
});

it(`Expected: 1, Got: ${calculator.operate(calculator.add, -1,2)}`, () => {
  assert(calculator.operate(calculator.add, -1, 2) === 1, "add(-1, 2) !== 1");
});

it(`Expected: 1, Got: ${calculator.operate(calculator.add, 2,-1)}`, () => {
  assert(calculator.operate(calculator.add, 2, -1) === 1, "add(2, -1) !== 1");
});

console.log('┌────────────────────────────────────────┐');
console.log('| Subtract                               |');
console.log('└────────────────────────────────────────┘');

it(`Expected: 0, Got: ${calculator.operate(calculator.subtract, 0,0)}`, () => {
  assert(calculator.operate(calculator.subtract, 0, 0) === 0, "subtract(0,0) !== 0");
});

it(`Expected: 1, Got: ${calculator.operate(calculator.subtract, 2,1)}`, () => {
  assert(calculator.operate(calculator.subtract, 2, 1) === 1, "subtract(2, 1) !== 1");
});

it(`Expected: -1, Got: ${calculator.operate(calculator.subtract, 1,2)}`, () => {
  assert(calculator.operate(calculator.subtract, 1, 2) === -1, "subtract(1, 2) !== -1");
});

it(`Expected: -3, Got: ${calculator.operate(calculator.subtract, -2,1)}`, () => {
  assert(calculator.operate(calculator.subtract, -2, 1) === -3, "subtract(-2, 1) !== -3");
});

it(`Expected: 3, Got: ${calculator.operate(calculator.subtract, 2,-1)}`, () => {
  assert(calculator.operate(calculator.subtract, 2, -1) === 3, "subtract(2, -1) !== 3");
});

console.log('┌────────────────────────────────────────┐');
console.log('| Multiply                               |');
console.log('└────────────────────────────────────────┘');

it(`Expected: 0, Got: ${calculator.operate(calculator.multiply, 0,0)}`, () => {
  assert(calculator.operate(calculator.multiply, 0, 0) === 0, "multiply(0,0) !== 0");
});

it(`Expected: 0, Got: ${calculator.operate(calculator.multiply, 5,0)}`, () => {
  assert(calculator.operate(calculator.multiply, 5, 0) === 0, "multiply(5,0) !== 0");
});

it(`Expected: 10, Got: ${calculator.operate(calculator.multiply, 5,2)}`, () => {
  assert(calculator.operate(calculator.multiply, 5, 2) === 10, "multiply(5,2) !== 10");
});

it(`Expected: -10, Got: ${calculator.operate(calculator.multiply, 5,-2)}`, () => {
  assert(calculator.operate(calculator.multiply, 5, -2) === -10, "multiply(5,-2) !== -10");
});

it(`Expected: 10, Got: ${calculator.operate(calculator.multiply, -5,-2)}`, () => {
  assert(calculator.operate(calculator.multiply, -5, -2) === 10, "multiply(-5,-2) !== 10");
});

console.log('┌────────────────────────────────────────┐');
console.log('| Divide                                 |');
console.log('└────────────────────────────────────────┘');

it(`Expected: NaN, Got: ${calculator.operate(calculator.divide, 0,0)}`, () => {
  assert(calculator.operate(calculator.divide, 0,0) === 'NaN', "divide(0,0) !== NaN");
});

it(`Expected: Infinity, Got: ${calculator.operate(calculator.divide, 5,0)}`, () => {
  assert(calculator.operate(calculator.divide, 5, 0) === 'Infinity', "divide(5,0) !== Infinity");
});

it(`Expected: 2, Got: ${calculator.operate(calculator.divide, 4,2)}`, () => {
  assert(calculator.operate(calculator.divide, 4, 2) === 2, "divide(4,2) !== 2");
});

it(`Expected: 2.5, Got: ${calculator.operate(calculator.divide, 5,2)}`, () => {
  assert(calculator.operate(calculator.divide, 5, 2) === 2.5, "divide(5,2) !== 2.5");
});

it(`Expected: 3.142857142857143, Got: ${calculator.operate(calculator.divide, 22,7)}`, () => {
  assert(calculator.operate(calculator.divide, 22, 7) === 3.142857142857143, "divide(22,7) !== 3.142857142857143");
});

console.log('└─────────────────────────────────────────');
