/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require("chai");
const assert = chai.assert;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let Solver;

suite("UnitTests", () => {
  suiteSetup(() => {
    // Mock the DOM for testing and load Solver
    return JSDOM.fromFile("./views/index.html").then(dom => {
      global.window = dom.window;
      global.document = dom.window.document;

      Solver = require("../public/sudoku-solver.js");
      //console.log(Solver.checkNum("1"))
    });
  });

  // Only the digits 1-9 are accepted
  // as valid input for the puzzle grid
  suite("Function checkNum()", () => {
    test('Valid "1-9" characters', done => {
      const input = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
      input.forEach((ele, i) => {
        assert.isTrue(Solver.checkNum(ele));
      });
      done();
    });

    // Invalid characters or numbers are not accepted
    // as valid input for the puzzle grid
    test('Invalid characters (anything other than "1-9") are not accepted', done => {
      const input = ["!", "a", "/", "+", "-", "0", "10", 0, "."];
      input.forEach((ele, i) => {
        assert.strictEqual(Solver.checkNum(ele), false);
      });
      done();
    });
  });

  suite("Function strToArray()", () => {
    test("Parses a valid puzzle string into an object", done => {
      const input =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
      const output = [
        [".", ".", "9", ".", ".", "5", ".", "1", "."],
        ["8", "5", ".", "4", ".", ".", ".", ".", "2"],
        ["4", "3", "2", ".", ".", ".", ".", ".", "."],
        ["1", ".", ".", ".", "6", "9", ".", "8", "3"],
        [".", "9", ".", ".", ".", ".", ".", "6", "."],
        ["6", "2", ".", "7", "1", ".", ".", ".", "9"],
        [".", ".", ".", ".", ".", ".", "1", "9", "4"],
        ["5", ".", ".", ".", ".", "4", ".", "3", "7"],
        [".", "4", ".", "3", ".", ".", "6", ".", "."]
      ];
      assert.deepStrictEqual(Solver.strToArray(input), output);
      done();
    });
  });

  suite("Function solveButton()", () => {
    // Puzzles that are not 81 numbers/periods long show the message
    // "Error: Expected puzzle to be 81 characters long." in the
    // `div` with the id "error-msg"
    test("Shows an error for puzzles that are not 81 numbers long", done => {
      const textArea = document.getElementById("text-input");
      const errorDiv = document.getElementById("error-msg");
      const errorMsg = "Error - expected puzzle to be 81 characters long";

      textArea.value = "83.9.....6.62.71...9......1945....4.37.4.3..6..";
      Solver.solveButton(textArea);
      assert.strictEqual(errorDiv.innerText, errorMsg);
      textArea.value =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6...";
      Solver.solveButton(textArea);
      assert.strictEqual(errorDiv.innerText, errorMsg);
      done();
    });

    test("Shows an error for puzzles that contain invalid characters", done => {
      const textArea = document.getElementById("text-input");
      const errorDiv = document.getElementById("error-msg");
      const errorMsg = "Error - text not valid";

      textArea.value =
        "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6xx";
      Solver.solveButton(textArea);
      assert.strictEqual(errorDiv.innerText, errorMsg);
      done();
    });

    // Invalid complete puzzles fail
    //     test("Invalid puzzles fail", done => {
    //       const input =
    //         "779235418851496372432178956174569283395842761628713549283657194516924837947381625";

    //       // done();
    //     });
    test("Returns the expected solution for an incomplete puzzle", done => {
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

  //   suite("Function solveButton()", () => {
  //     // Returns the expected solution for a valid, incomplete puzzle

  //   });
});
