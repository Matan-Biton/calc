function onStart() {
  // adding the onclick listeners to all the digits, the four basic operators and the dot
  for (const btn of Array.from(
    document.querySelectorAll("button.digit, button.dot, button.operator")
  )) {
    const func = btn.classList.contains("operator")
      ? operatorClicked
      : operandParsing;
    btn.addEventListener("click", () => {
      func(btn.id);
    });
  }

  // if page is loaded after configuration then sets the style accordingly
  const urlParams = new URLSearchParams(window.location.search);
  document.body.style.backgroundColor = urlParams.get("colorpick");

  document.body.style.fontFamily = urlParams.get("font");

  urlParams.get("theme") == "dark"
    ? document.body.classList.add("dark")
    : document.body.classList.remove("dark");
}

function openLog() {
  byId("log").classList.toggle("hidden");
  byId("logBtn").classList.toggle("btnActive");
}

function toMemory(exp: string) {
  const newChild = document.createElement("div");
  newChild.innerHTML = `${exp.replace("*", "x")}${window.innerWidth >= 800 ? '<br>' : ''} = ${eval(exp.replace("x", "*"))}`;
  memory.prepend(newChild);
}

function openScientific() {
  byId("science").classList.toggle("hidden");
  byId("scienceBtn").classList.toggle("btnActive");
  isScienceOn = !isScienceOn;
}

function screenLight() {
  screenElement.classList.toggle("light");
  byId("screenLight").classList.toggle("btnActive");
}

function alertInfo() {
  alert(
    "Developer name: Matan Biton\nCalculator Version: Stage III\nThis is my basic calculator, have fun with it :)"
  );
}

function openConfig() {
  location.pathname = "config/config.html";
}

function back() {
  //deletes from screen and resets the last of [first operand, operator, second operand]
  screenElement.textContent = "";
  if ((curOperand || firstOperand) && !curOperator) {
    screenElement.innerText = "";
  } else if (curOperator && !curOperand) {
    curOperator = "";
    screenElement.textContent = firstOperand;
  } else if (curOperand) {
    curOperand = "";
    screenElement.textContent = firstOperand + " " + curOperator + " ";
  }
}

function clearScreen() {
  screenElement.textContent = "";
  memory.innerHTML = "";
  curOperand = firstOperand = curOperator = "";
}

//calling back a function that sets listeners to objects in the HTML post load
document.addEventListener("DOMContentLoaded", onStart);
