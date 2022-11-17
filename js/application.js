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
  alert('Developer name: Matan Biton\nCalculator Version: Stage I\nThis is my basic calculator, have fun with it :)');
}

function config() {
  document.querySelector('#config').onclick = () => window.open('config/config.html', '_blank');
}






document.addEventListener("DOMContentLoaded", setFunctions)