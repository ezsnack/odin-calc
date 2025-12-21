let displayString = "";
const MAXLEN = 8; //maximum operand number of digits
let x = NaN; //first operand
let y = NaN; //second operand
let method;
let operatorChosen = false;
let decimalPointAdded = false;
let calculated = false;

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".op");
const result = document.querySelector("#calculate");
const clr = document.querySelector("#clear");
const display = document.querySelector("#display");

for (let number of numbers) {
  const inputNumber = number.textContent;
  number.addEventListener("click", () => {
    if (calculated) {
      console.log("result already calculated. press 'C' to clear");
    } else if (displayString.length < MAXLEN) {
      displayString += inputNumber;
      updateDisplay();
    } else {
      console.log("digit limit reached. number will not be updated")
    }
  });
}

for (let operator of operators) {
  operator.addEventListener("click", () => {
    if (operatorChosen) {
      console.log("operator already chosen");
    } else {
      storeFirstNumber();
      operatorChosen = true;
      if (Number.isNaN(x)) {
        console.log("first operand has not been input");
        clear();
      }
    }
  });
}
add.addEventListener("click", () => method = addition);
sub.addEventListener("click", () => method = subtraction);
mul.addEventListener("click", () => method = multiplication);
div.addEventListener("click", () => method = division);
result.addEventListener("click", calculateResult);
clr.addEventListener("click", clear);



function updateDisplay() {
  display.textContent = displayString;
}

function storeFirstNumber() {
  x = parseInt(displayString); //change to parse float later?
  displayString = "";
  updateDisplay();
}

function calculateResult() {
  if (calculated) {
    console.log("result already calculated");
  } else if (!operatorChosen) {
    console.log("no operator chosen");
  } else {
    y = parseInt(displayString);
    if (Number.isNaN(y)) {
      console.log("second operand has not been input");
    } else {
      if (method == division && y == 0)
        displayString = "~infinity~";
      else
        displayString = method(x, y).toString();
      updateDisplay();
      calculated = true;
    }
  }
}

function clear() {
  displayString = "";
  updateDisplay();
  decimalPointAdded = false;
  operatorChosen = false;
  calculated = false;
  x = NaN;
  y = NaN;
}

function addition(x, y) {
  return x + y;
}

function subtraction(x, y) {
  return x - y;
}

function multiplication(x, y) {
  return x * y;
}

function division(x, y) {
  return x / y;
}
