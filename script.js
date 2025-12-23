let displayString = "";
const MAXLEN = 8; //maximum input operand length
let x = NaN; //first operand
let y = NaN; //second operand
let method = nothing;
let firstNumberPresent = false;
let operatorChosen = false;
let decimalInputActive = false;
let justCalculated = false;

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".op");
const result = document.querySelector("#calculate");
const clr = document.querySelector("#clear");
const display = document.querySelector("#display");
const decimal = document.querySelector("#dot");
// const add = document.querySelector("#add");
// const sub = document.querySelector("#sub");
// const mul = document.querySelector("#mul");
// const div = document.querySelector("#div");

for (let number of numbers) {
  const inputNumber = number.textContent;
  number.addEventListener("click", () => {
    if (justCalculated) {
      console.log("cannot add numbers to the result. press an operator to calculate using the current result as first value, or press 'C' to clear");
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
    if (justCalculated) {
      justCalculated = false;
      operatorChosen = true;
    } else if (firstNumberPresent) {
      y = parseFloat(displayString);
      calculateResult();
      operatorChosen = true;
      justCalculated = false; // so a new number can be input
    } else {
      x = parseFloat(displayString);
      displayString = "";
      operatorChosen = true;
      firstNumberPresent = true;
      decimalInputActive = false;
      if (Number.isNaN(x)) {
        console.log("first operand has not been input or is invalid. resetting");
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
decimal.addEventListener("click", decimalInput);


function decimalInput() {
  if (decimalInputActive) {
    console.log("decimal point has already been input. ignoring");
  } else {
    displayString += ".";
    updateDisplay();
    decimalInputActive = true;
  }
}

function updateDisplay() {
  display.textContent = displayString;
}

function calculateResult() {
  y = parseFloat(displayString);
  if (!operatorChosen) {
    console.log("no operator chosen");
  } else if (Number.isNaN(y)) {
    console.log("second operand has not been input or is invalid. or you pressed two operators after one another");
    displayString = "";
  } else {
    if (method == division && y == 0) {
      displayString = "HMM... 0";
      console.log("division by zero. setting the result to zero");
      x = 0; // mathematically incorrect
    } else {
      x = method(x, y);
      if (x > 99999999) {
        displayString = "2MUCH";
        console.log("result too large to display. you can still keep using it for further calculations")
      } else
        displayString = x.toString().slice(0, MAXLEN); 
    }
    updateDisplay();
    displayString = "";
    justCalculated = true;
    method = nothing;
    operatorChosen = false;
    y = NaN;
  }
}

function clear() {
  displayString = "";
  updateDisplay();
  method = nothing;
  operatorChosen = false;
  decimalInputActive = false;
  firstNumberPresent = false;
  justCalculated = false;
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

function nothing() {
}
