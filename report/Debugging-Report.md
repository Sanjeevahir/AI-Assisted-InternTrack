# Week 3 Debugging Report

## Project
AI-Assisted InternTrack - Software Testing and Debugging Exercise

## Module Tested
Calculator Utility Module

## Testing Strategy
Jest unit tests were created for addition, subtraction, multiplication, division, division-by-zero handling, and percentage calculation. Positive, negative, zero, and error cases were included.

## Bugs Found
1. Addition logic: add() used subtraction instead of addition.
2. Division by zero: divide() did not reject a zero divisor.
3. Percentage formula: percentage() divided the percentage by 10 instead of 100.

## Debugging Approach
1. Run the unit test suite.
2. Review failing test names and expected/actual results.
3. Inspect the related function.
4. Identify the incorrect expression or missing validation.
5. Apply the fix.
6. Run tests again.
7. Review coverage.

## Fixes
- Changed addition from subtraction to addition.
- Added a division-by-zero check.
- Corrected percentage calculation to divide by 100.

## Refactoring
The final calculator module was refactored with clear function names, consistent formatting, small single-purpose functions, and readable code structure. The refactoring did not change the expected functionality of the module.

## Lessons Learned
- Unit tests can detect logical errors quickly.
- Edge-case tests are important.
- Debugging should be systematic.
- Code should be tested again after fixes.
- Coverage helps identify untested code paths.

## Final Verification
After debugging and refactoring, the complete Jest test suite was executed successfully.

Test Suites: 1 passed, 1 total
Tests: 9 passed, 9 total
Tests Failed: 0

Code Coverage:
Statements: 100%
Branches: 100%
Functions: 100%
Lines: 100%

All tests passed successfully and the final code achieved 100% test coverage.