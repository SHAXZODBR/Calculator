let operation = "add";
let result = 0;
const display = document.querySelector(".display");

const sum = (a, b) => a + b;
const sub = (a, b) => a - b;
const multiply = (a, b) => a * b;
const division = (a, b) => {
  if(b === 0) alert("You can't divide by 0");
  return a / b;
};

const operate = (operator, a, b) => {
    if((a && b) && operator) {
        if(operator === "+"){
            sum(a,b);
        }else if(operator === "-"){
            sub(a,b);
        }else if (operator === "*"){
            multiply(a,b);
        }else if(operator === "/"){
            division(a, b);
        }
    }
}



const calculate = () => {
  switch (operation) {
    case "add":
      return operate(add, number1, number2);
    case "substract":
      return operate(substract, number1, number2);
    case "divide":
      return operate(divide, number1, number2);
    case "multiply":
      return operate(multiply, number1, number2);
    default:
      return result; 
  }
};

// lines 21-42 added by Lucy ; ERASE AFTER YOU TAKE OVER
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
    updateDisplay(numberPressed);
  });
});
