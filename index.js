let result = 0;
let number1 = "";
let number2 = "";
let operationType = "+";
let isFloat = false;
let isFinalResult = false;
const display = document.querySelector(".display");
const equalButton = document.getElementById("equal");
const backspaceButton = document.getElementById("backspace");
//const decimalButton = document.getElementById('decimal');

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

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => {
  updateDisplay("");
});

const handleEqualClick = () => {
  result = roundResult(operate(allOperators[operationType], number1, number2));
  display.textContent = result.toString().substring(0, 10);
  number1 = result.toString().substring(0, 10);
  isFinalResult = true;
};

function updateDisplay(number) {
  let displayContent = document.querySelector(".display").textContent;
  // let updatedContent = Number(displayContent + number);
  let updatedContent = displayContent + number.toString();
  document.querySelector(".display").textContent = updatedContent;
}

function clearDisplay() {
  document.querySelector(".display").textContent = 0;
}

const numberButtons = document.querySelectorAll(".btn--number");

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const numberPressed = button.textContent;
    if (numberPressed === ".") {
      if (isFloat) return;
      else {
        isFloat = true;
      }
    }
    clearButton.textContent = "C";
    number2 += numberPressed;
    number2 = number2.length <= 8 ? number2 : removeLastNumber(number2);
    display.textContent = number2;
  });
});

const operatorButtons = document.querySelectorAll(".btn--operator");

operatorButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // const operator = button.textContent.trim(); // Get the text content of the button
    const operator = e.target.dataset.operator;
    const operationToAssign = operator;
    handleOperatorClick(operationToAssign);

    console.log("Operation:", operationType); // For debugging
  });
});

const handleOperatorClick = (operation) => {
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

// const setToFloat = (input) => {
//   if (numberPressed === ".") {
//     if (isFloat) return;
//     else {
//       isFloat = true;
//     }
//   }
// };

backspaceButton.addEventListener("click", () => {
  number2 = backspace(number2);
});

equalButton.addEventListener("click", () => {
  // result = roundResult(operate(allOperators[operationType], number1, number2));
  // display.textContent = result.toString().substring(0, 10);
  // number1 = result.toString().substring(0, 10);
  // isFinalResult = true;
  // console.log(result);
  handleEqualClick();
});

function backspace(number) {
  number = number.slice(0, -1);
  display.textContent = number;
  return number;
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
  operation = "add";
  resultDisplay.textContent = result.toString();
  clearBtn.textContent = "AC";
};

// const calculate = () => {
//   result = operate(operations[operationType], number1, number2);
// };
// Keyboard
document.addEventListener("keydown", function (event) {
  const key = event.key;
  if (!isNaN(key)) {
    addToDisplay(parseInt(key));
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    handleOperatorClick(key);
  } else if (key === "=" || key === "Enter") {
    handleEqualClick();
  } else if (key === ".") {
    addDecimal();
  } else if (key === "Backspace") {
    number2 = backspace(number2);
  } else if (key === "Escape") {
    clearDisplay();
  }
});
