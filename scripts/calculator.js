let curOperand = "";
let firstOperand = "";
let curOperator = "";
const screenElement = byId("screen");
const memory = byId("memory");
let isScienceOn = false;
function byId(id) {
    return document.getElementById(id);
}
function qsa(selector) {
    return document.querySelectorAll(selector);
}
function operandParsing(id) {
    //if a valid (x.. not valid, 00xyz also not valid) button pressed updates the currant operand
    if ((id == "." && curOperand.includes(".")) ||
        (id == "0" && curOperand == "0")) {
        return;
    }
    if (!curOperand && !curOperator) {
        byId("screen").innerText = "";
    }
    curOperand += id;
    screenElement.textContent += id;
}
function calculate() {
    if (curOperand && firstOperand) {
        firstOperand = eval(screenElement.innerText.replace("x", "*")).toString();
        curOperator = curOperand = "";
        toMemory();
        screenElement.textContent = firstOperand;
    }
}
function operatorClicked(id) {
    //do nothing if called before parsing an operand, if there is an operator (that means there are two operands as well) evaluates
    // and then updates the first operand and current operator
    if (!screenElement.innerText) {
        return;
    }
    if (curOperator) {
        calculate();
    }
    else if (curOperand) {
        firstOperand = curOperand;
        curOperand = "";
    }
    curOperator = id;
    screenElement.textContent = firstOperand + " " + curOperator + " ";
}
