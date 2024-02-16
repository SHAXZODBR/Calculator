const test = "test";

let result = 0;
let number1 = "";
let number2 = "";
let operationType = "+";
let isFloat = false;
let isFinalResult = false;

const display = document.querySelector(".display");
const equalButton = document.getElementById("equal");
const backspaceButton = document.getElementById("backspace");
const clearButton = document.getElementById("clear");
const numberButtons = document.querySelectorAll(".btn--number");
const operatorButtons = document.querySelectorAll(".btn--operator");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) alert("You can't divide by 0");
  return a / b;
};

const operate = (operator, a, b) => operator(+a, +b);

const allOperators = {
  "+": add,
  "=": subtract,
  "*": multiply,
  "/": divide,
};

// const operate = (operator, a, b) => {
//   if (a && b && operator) {
//     if (operator === "+") {
//       add(a, b);
//     } else if (operator === "-") {
//       substract(a, b);
//     } else if (operator === "*") {
//       multiply(a, b);
//     } else if (operator === "/") {
//       divide(a, b);
//     }
//   }
// };

// function updateDisplay(number) {
//   let displayContent = document.querySelector(".display").textContent;
//   // let updatedContent = Number(displayContent + number);
//   let updatedContent = displayContent + number.toString();
//   document.querySelector(".display").textContent = updatedContent;
// }

const handleNumberInput = (input) => {
  if (number2 === "0" && input !== ".") {
    return;
  }
  if (input === ".") {
    if (isFloat) return;
    else {
      isFloat = true;
    }
  }
  clearButton.textContent = "C";
  number2 += input;
  number2 = number2.length <= 8 ? number2 : handleBackspace(number2);
  display.textContent = number2;
};

const handleOperatorClick = (operation) => {
  console.log(operation);
  if (isFinalResult) {
    isFinalResult = false;
    operationType = operation;
    number2 = "";
    return;
  }

  if (number2 !== "") {
    isFloat = false;
    result = roundResult(
      operate(allOperators[operationType], number1, number2)
    );
    operationType = operation;
    number1 = result.toString().substring(0, 10);
    display.textContent = result.toString().substring(0, 10);
    number2 = "";
  }

  if (number2 === "") {
    operationType = operation;
  }
};

function handleBackspace(numberString) {
  let numberArray = numberString.split("");
  const removedElement = numberArray.splice(-1, 1);
  if (removedElement[0] === ".") {
    isFloat = false;
  }
  numberString = numberArray.join("");
  display.textContent = numberString;
  return numberString;
}

function addDecimal(numberString) {
  if (!numberString.includes(".")) {
    numberString += ".";
    return numberString;
  }
  return numberString;
}

function roundResult(result) {
  const maxValue = 999999999;
  const minValue = -999999999;
  if (result > maxValue) {
    return maxValue;
  }
  if (result < minValue) {
    return minValue;
  }
  return Math.round(result * 1e8) / 1e8;
}

const resetAllParameters = () => {
  number1 = "";
  number2 = "";
  result = 0;
  isFloat = false;
  isFinalResult = false;
  operationType = "+";
  display.textContent = result.toString();
  clearButton.textContent = "AC";
};

const handleEqualClick = () => {
  result = roundResult(operate(allOperators[operationType], number1, number2));
  display.textContent = result.toString().substring(0, 10);
  number1 = result.toString().substring(0, 10);
  isFinalResult = true;
};

function clearDisplay() {
  number2 = "";
  display.textContent = "0";
  clearButton.textContent = "AC";
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const numberPressed = button.textContent;
    handleNumberInput(numberPressed);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const operator = button.textContent.trim(); // Get the text content of the button
    let operationToAssign;

    // if (operator === "+") {
    //   operationToAssign = "+";
    // } else if (operator === "-") {
    //   operationToAssign = "-";
    // } else if (operator === "/") {
    //   operationToAssign = "/";
    // } else if (operator === "X") {
    //   operationToAssign = "*";
    // }
    // OR
    if (operator === "X") operationToAssign = "*";
    else operationToAssign = operator;
    console.log(operator);

    // const operator = e.target.dataset.operator;
    // const operationToAssign = operator;
    handleOperatorClick(operationToAssign);

    console.log("Operation:", operationType); // For debugging
  });
});

equalButton.addEventListener("click", () => {
  handleEqualClick();
});

clearButton.addEventListener("click", () => {
  if (number2 !== "") {
    clearDisplay();
  } else {
    resetAllParameters();
  }
});

backspaceButton.addEventListener("click", () => {
  number2 = handleBackspace(number2);
});

// Keyboard
document.addEventListener("keydown", function (event) {
  const key = event.key;
  if (!isNaN(key)) {
    handleNumberInput(key.toString());
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    handleOperatorClick(key);
  } else if (key === "=" || key === "Enter") {
    handleEqualClick();
  } else if (key === ".") {
    handleNumberInput(key);
  } else if (key === "Backspace") {
    number2 = handleBackspace(number2);
  } else if (key === "Escape") {
    if (number2 !== "") {
      clearDisplay();
    } else {
      resetAllParameters();
    }
  }
});
