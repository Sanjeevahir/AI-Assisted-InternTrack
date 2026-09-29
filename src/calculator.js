// Week 3: Intentionally flawed calculator module.
// Deliberate bugs are included for the testing/debugging exercise.

function add(a, b) {
  return a + b; // BUG: should add
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }

  return a / b; // BUG: division by zero is not handled
}

function percentage(value, percent) {
  return value * (percent / 100); // BUG: should divide percent by 100
}

module.exports = { add, subtract, multiply, divide, percentage };
