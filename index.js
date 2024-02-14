let calculator = {
  currentInput: "",
  firstNumber: "",
  operator: "",
  hasResult: false,
};

function addToDisplay(number) {
  if (calculator.hasResult) {
    clearCalculator();
  }
  if (number === "." && calculator.currentInput.includes(".")) {
    return;
  }
  calculator.currentInput += number;
  updateDisplay();
}

function updateDisplay() {
  document.getElementById("display").innerText = calculator.currentInput;
}

function operation(op) {
  if (calculator.currentInput !== "") {
    if (calculator.firstNumber === "") {
      calculator.firstNumber = parseFloat(calculator.currentInput);
      calculator.operator = op;
      calculator.currentInput = "";
      updateDisplay();
    } else {
      let secondNumber = parseFloat(calculator.currentInput);
      let result = operateFunction(
        calculator.operator,
        calculator.firstNumber,
        secondNumber
      );
      calculator.currentInput = result.toString();
      calculator.firstNumber = calculator.currentInput;
      calculator.operator = op;
      updateDisplay();
    }
  }
}

function operate() {
  if (
    calculator.firstNumber !== "" &&
    calculator.operator !== "" &&
    calculator.currentInput !== ""
  ) {
    let secondNumber = parseFloat(calculator.currentInput);
    let result = operateFunction(
      calculator.operator,
      calculator.firstNumber,
      secondNumber
    );
    result = roundResult(result);
    calculator.currentInput = result.toString();
    calculator.firstNumber = "";
    calculator.operator = "";
    calculator.hasResult = true;

    updateDisplay();
  }
}

function roundResult(result) {
  return Math.round(result * 1e8) / 1e8;
}

function clearDisplay() {
  clearCalculator();
  updateDisplay();
}

function clearCalculator() {
  calculator.currentInput = "";
  calculator.firstNumber = "";
  calculator.operator = "";
  calculator.hasResult = false;
}

function operateFunction(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "Invalid operator!";
  }
}

function addDecimal() {
  if (!calculator.currentInput.includes(".")) {
    calculator.currentInput += ".";
    updateDisplay();
  }
}

function backspace() {
  calculator.currentInput = calculator.currentInput.slice(0, -1);
  updateDisplay();
}

// Math functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: Division by zero!";
  }
  return a / b;
}

// Keyboard
document.addEventListener("keydown", function (event) {
  const key = event.key;
  if (!isNaN(key)) {
    addToDisplay(parseInt(key));
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    operation(key);
  } else if (key === "=" || key === "Enter") {
    operate();
  } else if (key === ".") {
    addDecimal();
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
