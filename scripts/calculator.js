let curOperand = null;
let firstOperand = null;
let curOperator = null;
let curValue = null;
let prevCalcs = "";
function toScreen(id) {
    //accepts only a digit or a dot and updates the current operand, only accepts valid option.
    //accepts only one zero at the beginning to allow for 0.rest and accepts only one use of a dot in a number.
    if (!curOperand) {
        if (firstOperand && !curOperator) {
            clearScreen();
        }
        document.querySelector("#screen").textContent += id;
        curOperand = id;
    }
    else if (!(id == "." && curOperand.includes(".")) &&
        !(id == "0" && curOperand == "0")) {
        if (curOperand == "0") {
            document.querySelector("#screen").textContent.slice(0, -1);
        }
        else {
            document.querySelector("#screen").textContent += id;
            curOperand = curOperand ? curOperand + id : id;
        }
    }
}
function calculate() {
    //eval the equation when called given that there are two operands (if there are two operands there most be an operator)
    if (curOperand && firstOperand) {
        prevCalcs +=
            firstOperand +
                curOperator +
                curOperand +
                eval(firstOperand + curOperator + curOperand);
        curOperator = curOperator == "x" ? "*" : curOperator;
        curValue = firstOperand = eval(firstOperand + curOperator + curOperand);
        curOperator = curOperand = null;
        document.querySelector("#screen").textContent = curValue;
    }
}
function operatorClicked(id) {
    //when there is no operand do nothing.
    //in case of one operand and no operator it sets the operator and starts filling the other operand.
    //when there are two operands (and operator) there is a call for calculate and then an update for the first operand and operator
    const pressed = id == 'x' ? '*' : id;
    if (firstOperand && curOperand) {
        calculate();
        curOperator = pressed;
        document.querySelector("#screen").textContent =
            firstOperand + " " + curOperator + " ";
    }
    else if (curOperand) {
        if (!curOperator) {
            firstOperand = curOperand;
            curOperand = null;
            curOperator = pressed;
            document.querySelector("#screen").textContent += " " + curOperator + " ";
        }
    }
    else if (firstOperand) {
        curOperator = pressed;
        document.querySelector("#screen").textContent =
            firstOperand + " " + curOperator + " ";
    }
}
