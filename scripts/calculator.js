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
        firstOperand = "";
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
    if (curOperator && !isScienceOn) {
        calculate();
    }
    else if (curOperand) {
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
    const tokens = screenElement.innerText.replace("x", "*").split(" ");
    if ("*/".includes(tokens[1])) {
        firstOperand = eval(tokens[0] + tokens[1] + tokens[2]).toString();
    }
    else if (tokens.length > 4) {
        if ("*/".includes(tokens[3])) {
            firstOperand =
                tokens[0] +
                    " " +
                    tokens[1] +
                    " " +
                    eval(tokens[2] + tokens[3] + tokens[4]).toString();
        }
        else {
            firstOperand =
                eval(tokens[0] + tokens[1] + tokens[2]).toString() +
                    " " +
                    tokens[3] +
                    " " +
                    tokens[4];
        }
    }
}
