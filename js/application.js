const setFunctions = function () {
  for (e of document.querySelectorAll('button.digit, button.dot')) {
    e.onclick = function () { toScreen(this.id) };
}

for (e of document.querySelectorAll('button.operator')) {
  e.onclick = function () { operatorClicked(this.id) };
  }
  
}

function openLog() {
  document.querySelector('.log').classList.toggle('hidden');
  }
  
function openScientific() {
  document.querySelector('.science').classList.toggle('hidden');
  }
  
function darkmodeHandler() {
  document.querySelector("body").classList.toggle("dark");
}

function alertInfo() {
  alert('Developer name: Matan Biton\nCalculator Version: Stage II\nThis is my basic calculator, have fun with it :)');
}

function config() {
  location.href = 'config/config.html';
}

function back() {
  document.querySelector('#screen').textContent = '';
  if ((curOperand || firstOperand) && !curOperator) {
    clearScreen();
  } else if (curOperator && !curOperand) {
    curOperator = null;
    document.querySelector('#screen').textContent = firstOperand;
  } else {
    curOperand = null;
    document.querySelector('#screen').textContent = firstOperand + ' ' + curOperator + ' ';
  }
    
}

function clearScreen() {
    document.querySelector('#screen').textContent = ''; 
    curOperand = firstOperand = curOperator = null;
}






document.addEventListener("DOMContentLoaded", setFunctions)