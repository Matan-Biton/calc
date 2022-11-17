let curOperand = null;
let firstOperand = null;
let curOperator = null;
let curValue = null;


function toScreen(id) {
    if (!curOperand) {  
        if (firstOperand && !curOperator) {
            clearScreen();
        }
        document.querySelector('#screen').textContent += id;
        curOperand = id;
    } else if (!(id == '.' && curOperand.includes('.')) && !(id == 0 && curOperand == 0)) {
        document.querySelector('#screen').textContent += id;
        curOperand = curOperand ? curOperand + id : id;   
    }
}

function calculate() {
    if (curOperand && firstOperand) {
        curOperator = curOperator == 'x' ? '*' : curOperator;
        curValue = firstOperand = eval(firstOperand + curOperator + curOperand)
        curOperator = curOperand = null;
        document.querySelector('#screen').textContent = curValue;
        alert(curValue)
    }
}

function operatorClicked(id) {
    if (firstOperand && curOperand) {   
        calculate();
        curOperator = id;
        // firstOperand = curValue;
        document.querySelector('#screen').textContent = firstOperand + ' ' + curOperator + ' ';
    } else if (curOperand) {
        if (!curOperator) {
            firstOperand = curOperand;
            curOperand = null;
            curOperator = id;
            document.querySelector('#screen').textContent += ' ' + curOperator + ' ';
        }
    } else if (firstOperand) {
        curOperator = id;
        document.querySelector('#screen').textContent = firstOperand + ' ' + curOperator + ' ';
    }
}
