// variables
let displayString = "";
const MAXLEN = 8; //maximum input operand length
let x = NaN; //first operand
let y = NaN; //second operand
let method = nothing;
let firstNumberPresent = false;
let operatorChosen = false;
let decimalInputActive = false;
let justCalculated = false;

// document elements
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".op");
const result = document.querySelector("#calculate");
const clr = document.querySelector("#clear");
const display = document.querySelector("#display");
const decimal = document.querySelector("#dot");
const back = document.querySelector("#backspace");
// the next four lines are not necessary as the browser automatically adds references to elements with an id. added to follow best practices
const add = document.querySelector("#add");
const sub = document.querySelector("#sub");
const mul = document.querySelector("#mul");
const div = document.querySelector("#div");

// event listeners
for (let number of numbers) {
  const input = number.textContent;
  number.addEventListener("click", () => inputNumber(input));
}
for (let operator of operators) {
  operator.addEventListener("click", () => addOperator);
}
add.addEventListener("click", () => method = addition);
sub.addEventListener("click", () => method = subtraction);
mul.addEventListener("click", () => method = multiplication);
div.addEventListener("click", () => method = division);
result.addEventListener("click", calculateResult);
clr.addEventListener("click", clear);
decimal.addEventListener("click", decimalInput);
back.addEventListener("click", backspace);

// functions
function inputNumber(number) {
  if (justCalculated) {
    console.log("cannot add numbers to the result. press an operator to calculate using the current result as first value, or press 'C' to clear");
  } else if (displayString.length < MAXLEN) {
    displayString += number;
    updateDisplay();
  } else {
    console.log("digit limit reached. number will not be updated")
  }
}

function addOperator() {
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
}

function decimalInput() {
  if (decimalInputActive) {
    console.log("decimal point has already been input. ignoring");
  } else if (justCalculated) {
    console.log("cannot add decimal point to calculated result");
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
    decimalInputActive = false;
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

function backspace() {
  if (displayString == "") {
    console.log("nothing to remove");
  } else {
    const lastChar = displayString.charAt(displayString.length - 1);
    if (lastChar == ".")
      decimalInputActive = false;
    displayString = displayString.slice(0, -1);
    updateDisplay();
  }
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

// keyboard support
document.addEventListener("keydown", event => {
  switch (event.key) {
    case "1":
      inputNumber("1");
      break;
    case "2":
      inputNumber("2");
      break;
    case "3":
      inputNumber("3");
      break;
    case "4":
      inputNumber("4");
      break;
    case "5":
      inputNumber("5");
      break;
    case "6":
      inputNumber("6");
      break;
    case "7":
      inputNumber("7");
      break;
    case "8":
      inputNumber("8");
      break;
    case "9":
      inputNumber("9");
      break;
    case "0":
      inputNumber("0");
      break;
    case ".":
      decimalInput();
      break;
    case "+":
      addOperator();
      method = addition;
      break;
    case "-":
      addOperator();
      method = subtraction;
      break;
    case "*":
      addOperator();
      method = multiplication;
      break;
    case "/":
    case ":":
      addOperator();
      method = division;
      break;
    case "Enter":
    case "=":
      calculateResult();
      break;
    case "Backspace":
      backspace();
      break;
    case "c":
    case "C":
      clear();
      break;
    default:
      console.log("no operations bound for this key");
      break;
  }
});
