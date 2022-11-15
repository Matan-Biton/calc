let curOperand = null;
let firstOperand = null;
let curOperator = null;

function clearScreen() {
    document.getElementById('screen').innerHTML = ''; 
    curOperand = operand2 = curOperator = null;
}

function toScreen(id) {
    if (!curOperand || !(id == '.' && curOperand.includes('.')) && !(id == 0 && curOperand == 0)) {
        document.getElementById('screen').innerHTML += id;
        curOperand = curOperand ? curOperand + id : id;   
    }
}

function calculate() {
    if (curOperand && firstOperand && curOperator) {
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
        firstOperand = ans;
        document.getElementById('screen').innerHTML = firstOperand;
    }
}

function operatorClicked(id) {
    if (firstOperand && !curOperator) {        
        curOperator = id;
        document.getElementById('screen').innerHTML += ' ' + curOperator + ' ';
    } else if (curOperand) {
        if (!curOperator) {
            firstOperand = curOperand;
            curOperand = null;
            curOperator = id;
            document.getElementById('screen').innerHTML += ' ' + curOperator + ' ';
        } else if (firstOperand) {
            calculate();
            curOperator = id;
            document.getElementById('screen').innerHTML += ' ' + curOperator + ' ';
        } else {
            alert(3);
            curOperator = id;
            document.getElementById('screen').innerHTML = firstOperand + ' ' + curOperator + ' ';
        }
    }
}
