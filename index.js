let result = 0;
let number1 = "";
let number2 = "";
let numArray1 = [];
let numArray2 = [];
let step = 0;
let operation = "";
let isFloat = false;
const display = document.querySelector(".display");
const equalButton = document.getElementById("equal");
const decimalButton = document.getElementById('decimal');
const deleteOneNumber = document.getElementById('backspace');

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
  clearDisplay("");
});


function clearDisplay() {
  document.querySelector(".display").textContent = "";
}

const numberButtons = document.querySelectorAll(".btn--number");
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const digit = button.textContent;    
      if (step === 0 || step === 1) {
        numArray1.push(digit)
        step= 1;
        number1= Number(numArray1.join(""));
        document.querySelector(".display").textContent = number1;
        console.log(number1)        
      } else if (step === 2) {
        numArray2.push(digit);
        number2= Number(numArray2.join(""));
        document.querySelector(".display").textContent = number2;
        console.log(number2);
      }  
  });
});

const operatorButtons = document.querySelectorAll(".btn--operator");
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const operator = button.textContent.trim(); // Get the text content of the button
    step = 2;
    if (operator === "+") {
      operation = "add";
    } else if (operator === "-") {
      operation = "subtract";
    } else if (operator === "/") {
      operation = "divide";
    } else if (operator === "X") {
      operation = "multiply";
    }
    document.querySelector(".display").textContent = operator;
    console.log("Operation:", operator); // For debugging
  });
});

const operate = (operator, a, b) => {
  if (a && b && operator) {
    if (operator === "+") {
      add(a, b);
    } else if (operator === "-") {
      subtract(a, b);
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
