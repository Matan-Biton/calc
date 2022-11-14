let curOperand = null;
let firstOperand = null;
let curOperator = null;

function clearScreen() {
    document.getElementById('screen').innerHTML = ''; 
    curOperand = operand2 = curOperator = null;
}

function toScreen(id) {
    let scr = document.getElementById('screen').innerHTML;
    if (id != '.' || !scr.includes('.')) {
        if (curOperand || id != 0) {
            document.getElementById('screen').innerHTML += id;
            curOperand == id;
        }
    }
}

function calculate() {
    curOperand = Number(curOperand);
    firstOperand = Number(firstOperand);
    let ans = 0;
    if (curOperator == '+') {
        ans = firstOperand + curOperand;
    } else if (curOperator == '-') {
        ans = firstOperand - curOperand;
    } else if (curOperator == 'x') {
        ans = firstOperand * curOperand;
    } else if (curOperator == '/') {
        ans = firstOperand / curOperand;
    }
    curOperator = curOperand = null;
    return ans;
}

function operatorClicked(id) {
    if (!curOperator & !firstOperand) {
        document.getElementById('screen').innerHTML += ' ' + id + ' ';
        curOperator = id;
        firstOperand = curOperand;
        curOperand = null;
    }
    // if (curOperand & firstOperand) {
    //     firstOperand = calculate();
    //     curOperator = id;
    //     document.getElementById('screen').innerHTML = firstOperand + ' ' + id + ' ';
}