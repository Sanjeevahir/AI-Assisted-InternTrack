const calculator = require("../src/calculator");

describe("Calculator Module", () => {
  test("adds two positive numbers", () => {
    expect(calculator.add(10, 5)).toBe(15);
  });

  test("adds negative and positive numbers", () => {
    expect(calculator.add(-5, 10)).toBe(5);
  });

  test("subtracts two numbers", () => {
    expect(calculator.subtract(10, 5)).toBe(5);
  });

  test("multiplies two numbers", () => {
    expect(calculator.multiply(6, 4)).toBe(24);
  });

  test("multiplies by zero", () => {
    expect(calculator.multiply(6, 0)).toBe(0);
  });

  test("divides two numbers", () => {
    expect(calculator.divide(20, 5)).toBe(4);
  });

  test("division by zero should throw an error", () => {
    expect(() => calculator.divide(20, 0)).toThrow("Cannot divide by zero");
  });

  test("calculates percentage", () => {
    expect(calculator.percentage(200, 10)).toBe(20);
  });

  test("calculates zero percentage", () => {
    expect(calculator.percentage(200, 0)).toBe(0);
  });
});
