const textArea = document.getElementById("text-input");
const solveBtn = document.getElementById("solve-button");
const clearBtn = document.getElementById("clear-button");
const errorMsg = document.getElementById("error-msg");
const cells = document.querySelectorAll(".sudoku-input");

// Check Functions

function checkText(str) {
  const regex = /^[1-9\.]+$/;
  return regex.test(str);
}

function checkNum(str) {
  const regex = /^[1-9]+$/;
  return regex.test(str);
}

function checkLength(str) {
  return str.length == 81;
}

// Conversion Functions

function strToArray(str) {
  let arr = [];
  for (let i = 0; i < str.length; i += 9) {
    arr.push(str.substring(i, i + 9).split(""));
  }
  return arr;
}

function arrayToStr(arr) {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str += arr[i].toString();
  }
  return str.replace(/,/g, "");
}

function setGrid(str) {
  const numbers = str.split("");
  cells.forEach((cell, i) => {
    const num = numbers[i];
    checkNum(num) ? (cell.value = num) : (cell.value = "");
  });
}

function setTextArea(textArea) {
  let newText = "";
  cells.forEach((cell, i) => {
    cell.value === "" ? (newText += ".") : (newText += cell.value);
  });
  textArea.value = newText;
}

// Solving

function findEmptyLocation(arr, l) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (arr[row][col] === ".") {
        l[0] = row;
        l[1] = col;
        return true;
      }
    }
  }
  return false;
}

function checkLocationSafe(arr, row, col, num) {
  function usedInRow(arr, row, num) {
    for (let i = 0; i < 9; i++) {
      if (arr[row][i] == num) return true;
    }
    return false;
  }

  function usedInCol(arr, col, num) {
    for (let i = 0; i < 9; i++) {
      if (arr[i][col] == num) return true;
    }
    return false;
  }

  function usedInBox(arr, row, col, num) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (arr[i + row][j + col] == num) return true;
      }
    }
    return false;
  }

  return (
    !usedInRow(arr, row, num) &&
    !usedInCol(arr, col, num) &&
    !usedInBox(arr, row - (row % 3), col - (col % 3), num)
  );
}

function solve(arr) {
  let l = [0, 0];
  if (!findEmptyLocation(arr, l)) return true; //true;
  let row = l[0],
    col = l[1];
  for (let num = 1; num < 10; num++) {
    if (checkLocationSafe(arr, row, col, num)) {
      arr[row][col] = num.toString();
      if (solve(arr)) return true;
      arr[row][col] = ".";
    }
  }
  return false;
}

function solveButton(textArea) {
  if (!checkLength(textArea.value))
    return (errorMsg.innerText =
      "Error - expected puzzle to be 81 characters long");
  if (!checkText(textArea.value))
    return (errorMsg.innerText = "Error - text not valid");
  errorMsg.innerText = "";
  let arr = strToArray(textArea.value);
  solve(arr);
  textArea.value = arrayToStr(arr);
  setGrid(textArea.value);
}

// Listeners

document.addEventListener("DOMContentLoaded", () => {
  // Load a simple puzzle into the text area
  textArea.value =
    "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
  //console.log(strToArray(textArea.value))
  setGrid(textArea.value);

  solveBtn.addEventListener("click", () => {
    solveButton(textArea);
  });

  clearBtn.addEventListener("click", () => {
    textArea.value = "";
    setGrid(textArea.value);
  });

  textArea.addEventListener("input", () => {
    setGrid(textArea.value);
  });

  cells.forEach(cell => {
    cell.addEventListener("input", () => {
      if (checkNum(cell.value)) setTextArea(textArea);
    });
  });
});
/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {
    checkNum,
    solveButton,
    strToArray,
    setGrid,
    setTextArea
  };
} catch (e) {}
