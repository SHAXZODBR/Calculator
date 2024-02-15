let operationType = "add";
let result = 0;
let number1 = "";
let number2 = "";
const display = document.querySelector(".display");
const equalButton = document.getElementById("equal");
//const decimalButton = document.getElementById('decimal');

const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) alert("You can't divide by 0");
  return a / b;
};

const allOperations = {
  add: add,
  substract: substract,
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
      operationType = "substract";
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

function backspace() {
  calculator.currentInput = calculator.currentInput.slice(0, -1);
  updateDisplay();
}

function addDecimal() {
  if (!calculator.currentInput.includes(".")) {
    calculator.currentInput += ".";
    updateDisplay();
  }
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

// const calculate = () => {
//   result = operate(operations[operationType], number1, number2);
// };
