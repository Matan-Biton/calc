function onStart() {
    // adding the onclick listeners to all the digits, the four basic operators and the dot
    for (const btn of Array.from(document.querySelectorAll("button.digit, button.dot, button.operator"))) {
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
function toMemory(exp) {
    const newChild = document.createElement("div");
    newChild.innerHTML = `${displayOrEval(exp, "display")}${window.innerWidth >= 800 ? '<br>' : ''} = ${eval(displayOrEval(exp, "eval"))}`;
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
    byId('infoPopup').style.display = 'flex';
}
function infoRead() {
    byId("infoPopup").style.display = "none";
}
function openConfig() {
    location.pathname = "config/config.html";
}
function back() {
    //deletes from screen and resets the last of [first operand, operator, second operand]
    screenElement.textContent = "";
    if ((curOperand || firstOperand) && !curOperator) {
        screenElement.innerText = "";
    }
    else if (curOperator && !curOperand) {
        curOperator = "";
        screenElement.textContent = firstOperand;
    }
    else if (curOperand) {
        curOperand = "";
        screenElement.textContent = firstOperand + " " + curOperator + " ";
    }
}
function clearScreen() {
    screenElement.textContent = "";
    memory.innerHTML = "";
    curOperand = firstOperand = curOperator = "";
}
function displayOrEval(str, target) {
    if (target == "display") {
        return str.replaceAll("**", "^").replaceAll("*", "x");
    }
    return str.replaceAll("^", "**").replaceAll("x", "*");
}
//calling back a function that sets listeners to objects in the HTML post load
document.addEventListener("DOMContentLoaded", onStart);
