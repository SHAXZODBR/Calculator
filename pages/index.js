let operation = "add";
let result = 0;

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
