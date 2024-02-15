let result = 0;
let number1 = "";
let number2 = "";
let operation = "add";
let isFloat = false;
const display = document.querySelector(".display");
const equalButton = document.getElementById("equal");
//const decimalButton = document.getElementById('decimal');

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) alert("You can't divide by 0");
  return a / b;
};

const allOperations = {
  add: add,
  subtract: subtract,
  multiply: multiply,
  divide: divide,
};

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
  updateDisplay("");
});

function updateDisplay(number) {
  let displayContent = document.querySelector(".display").textContent;
  let updatedContent = Number(displayContent + number);
  document.querySelector(".display").textContent = updatedContent;
}

function clearDisplay() {
  document.querySelector(".display").textContent = 0;
}

const numberButtons = document.querySelectorAll(".btn--number");
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const numberPressed = button.textContent;
    console.log(numberPressed);
    updateDisplay(numberPressed);
  });
});

const operatorButtons = document.querySelectorAll(".btn--operator");
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const operator = button.textContent.trim(); // Get the text content of the button
    if (operator === "+") {
      operationType = "add";
    } else if (operator === "-") {
      operationType = "subtract";
    } else if (operator === "/") {
      operationType = "divide";
    } else if (operator === "X") {
      operationType = "multiply";
    }
    console.log("Operation:", operationType); // For debugging
  });
});

const operate = (operator, a, b) => {
  if (a && b && operator) {
    if (operator === "+") {
      add(a, b);
    } else if (operator === "-") {
      substract(a, b);
    } else if (operator === "*") {
      multiply(a, b);
    } else if (operator === "/") {
      divide(a, b);
    }
  }
};

equalButton.addEventListener("click", () => {
  result = operate(operation, number1, number2);
  console.log(result);
});

const resetAllParameters = () => {
  number1 = "";
  number2 = "";
  result = 0;
  isFloat = false;
  operation = "add";
  resultDisplay.textContent = result.toString();
  clearBtn.textContent = "AC";
};

// const calculate = () => {
//   result = operate(operations[operationType], number1, number2);
// };
