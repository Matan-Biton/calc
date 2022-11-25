let curOperand = "";
let firstOperand = "";
let curOperator = "";
const screenElement = byId("screen");
const memory = byId("memory");
let isScienceOn = false;

function byId(id: string) {
  return document.getElementById(id);
}

function qsa(selector: string) {
  return document.querySelectorAll(selector);
}

function operandParsing(id: string) {
  //if a valid (x.. not valid, 00xyz also not valid) button pressed updates the currant operand
  if (
    (id == "." && curOperand.includes(".")) ||
    (id == "0" && curOperand == "0")
  ) {
    return;
  }
  if (!curOperand && !curOperator) {
    byId("screen").innerText = "";
    firstOperand = "";
  }
  curOperand += id;
  screenElement.textContent += id;
}

function calculate() {
  if (curOperand && firstOperand) {
    firstOperand = eval(screenElement.innerText.replace("x", "*")).toString();
    curOperator = curOperand = "";
    toMemory(screenElement.innerText);
    screenElement.textContent = firstOperand;
  }
}

function operatorClicked(id: string) {
  //do nothing if called before parsing an operand, if there is an operator (that means there are two operands as well) evaluates
  // and then updates the first operand and current operator
  if (!screenElement.innerText) {
    return;
  }
  if (curOperator && !isScienceOn) {
    calculate();
  } else if (curOperand) {
    firstOperand += curOperator
      ? " " + curOperator + " " + curOperand
      : curOperand;
    isScienceOn && scienceEval();
    curOperand = "";
  }
  curOperator = id;
  screenElement.textContent = firstOperand + " " + curOperator + " ";
}

function scienceEval() {
  function helper(start: number) {
    const expressionToEval =
      tokens[start] + " " + tokens[start + 1] + " " + tokens[start + 2];
    let res = "";
    for (let i = 0; i < start; i++) {
      res += tokens[i] + " ";
    }
    res += eval(expressionToEval).toString();
    for (let i = start + 3; i < tokens.length; i++) {
      res += " " + tokens[i];
    }
    toMemory(expressionToEval);
    return res;
  }

  const tokens = screenElement.innerText.replace("x", "*").split(" ");

  if ("*/".includes(tokens[1])) {
    firstOperand = helper(0);
  } else if (tokens.length > 4) {
    firstOperand = "*/".includes(tokens[3]) ? helper(2) : helper(0);
  }
}

function myPow(pow: number) {
  const val = curOperand ? curOperand : firstOperand && firstOperand;
  const ans = Math.pow(Number(val), pow);
  toMemory(`${val}**${pow}`);
  curOperand = ans.toString();
  screenElement.innerText = firstOperand
    ? firstOperand + " " + curOperator + " " + curOperand
    : curOperand;
}

function squared() {
  myPow(2)
}

function squareRoot() {
  myPow(0.5)
}

function advancedPow() {
  
}

function eventsForScience() {
  byId("^2").addEventListener("click", squared);
  byId("2√").addEventListener('click', squareRoot)
  // byId("^").addEventListener('click', advancedPow)
}

eventsForScience();
