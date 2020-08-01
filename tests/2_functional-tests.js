/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require("chai");
const assert = chai.assert;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let Solver;

suite("Functional Tests", () => {
  suiteSetup(() => {
    // DOM already mocked -- load sudoku solver then run tests
    Solver = require("../public/sudoku-solver.js");
  });

  suite("Text area and sudoku grid update automatically", () => {
    // Entering a valid number in the text area populates
    // the correct cell in the sudoku grid with that number
    test("Valid number in text area populates correct cell in grid", done => {
      const textArea = document.getElementById("text-input");
      textArea.value = "123456789";
      Solver.setGrid(textArea.value);
      const testArr = Array.from(document.querySelectorAll(".sudoku-input"))
        .map(cell => cell.value)
        .filter(str => str);
      const expected = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
      assert.deepStrictEqual(testArr, expected);
      done();
    });

    // Entering a valid number in the grid automatically updates
    // the puzzle string in the text area
    test("Valid number in grid updates the puzzle string in the text area", done => {
      const textArea = document.getElementById("text-input");
      textArea.value = "";
      Solver.setGrid(textArea.value);
      const gridCells = Array.from(
        document.querySelectorAll(".sudoku-input")
      ).map(cell => cell);
      gridCells[0].value = "9";
      gridCells[1].value = "8";
      gridCells[2].value = "7";
      const expected =
        "987..............................................................................";
      // Run function now that grid cells have changed
      Solver.setTextArea(textArea);
      assert.strictEqual(textArea.value, expected);
      done();
    });
  });

  suite("Clear and solve buttons", () => {
    // Pressing the "Clear" button clears the sudoku
    // grid and the text area
    test("Function clearInput()", done => {
      const textArea = document.getElementById("text-input");
      // Equivalent of clearBtn click
      textArea.value = "";
      Solver.setGrid(textArea.value);
      const gridValues = Array.from(document.querySelectorAll(".sudoku-input"))
        .map(cell => cell)
        .filter(cell => cell.value);
      assert.strictEqual(textArea.value, "");
      assert.deepStrictEqual(gridValues, []);
      done();
    });

    // Pressing the "Solve" button solves the puzzle and
    // fills in the grid with the solution
    test("Function showSolution(solve(input))", done => {
      const solveBtn = document.getElementById("solve-button");
      const textArea = document.getElementById("text-input");
      const output =
        "769235418851496372432178956174569283395842761628713549283657194516924837947381625";
      textArea.value =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      Solver.solveButton(textArea);
      assert.strictEqual(textArea.value, output);
      done();
    });
  });
});
