let curOperand = "";
let firstOperand = "";
let curOperator = "";
const screenElement = byId("screen");
const memory = byId("memory");

function byId(id: string) {
	return document.getElementById(id);
}

function qsa(selector: string) {
	return document.querySelectorAll(selector);
}

function toScreen(id: string) {
  //accepts only a digit or a dot and updates the current operand, only accepts valid option.
  //accepts only one zero at the beginning to allow for 0.rest and accepts only one use of a dot in a number.
  if (!curOperand) {
    if (firstOperand && !curOperator) {
      clearScreen();
    }
    screenElement.textContent += id;
    curOperand = id;
  } else if (
    !(id == "." && curOperand.includes(".")) &&
    !(id == "0" && curOperand == "0")
  ) {
    if (curOperand == "0") {
      curOperand = id;
      screenElement.textContent =
        screenElement.textContent.slice(0, -1) + curOperand;
    } else {
      screenElement.textContent += id;
      curOperand = curOperand ? curOperand + id : id;
    }
  }
}

function calculate() {
  //eval the equation when called given that there are two operands (if there are two operands there most be an operator)
  if (curOperand && firstOperand) {
    const screen = screenElement.innerText;
    firstOperand = eval(screen.replace("x", "*")).toString();
    curOperator = curOperand = "";
    toMemory();
    screenElement.textContent = firstOperand;
  }
}

function operatorClicked(id: string) {
  //when there is no operand do nothing.
  //in case of one operand and no operator it sets the operator and starts filling the other operand.
  //when there are two operands (and operator) there is a call for calculate and then an update for the first operand and operator
  if (curOperand && firstOperand) {
    calculate();
    curOperator = id;
    screenElement.textContent = firstOperand + " " + curOperator + " ";
  } else if (curOperand) {
    if (!curOperator) {
      firstOperand = curOperand;
      curOperand = "";
      curOperator = id;
      screenElement.textContent += " " + curOperator + " ";
    }
  } else if (firstOperand) {
    curOperator = id;
    screenElement.textContent = firstOperand + " " + curOperator + " ";
  }
}
