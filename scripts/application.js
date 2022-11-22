function onStart() {
    // adding the onclick listeners to all the digits, the four basic operators and the dot
    for (const btn of Array.from(document.querySelectorAll("button.digit, button.dot"))) {
        btn.addEventListener('click', () => { toScreen(btn.id); });
    }
    for (const btn of Array.from(document.querySelectorAll("button.operator"))) {
        btn.addEventListener('click', () => { operatorClicked(btn.id); });
    }
    // if page is loaded after configuration then sets the style accordingly
    const a = window.location.search;
    document.body.style.backgroundColor =
        "#" + a.slice(a.indexOf("%23") + 3, a.indexOf("&font"));
    document.body.style.fontFamily = a.slice(a.indexOf("font=") + 5, a.indexOf("&theme"));
    if (a.slice(-4) == 'dark') {
        document.body.classList.add('dark');
        document.querySelector("#themeHandler").classList.remove("btnActive");
    }
    else {
        document.body.classList.remove('dark');
        document.querySelector("#themeHandler").classList.add("btnActive");
    }
}
function openLog() {
    document.querySelector(".log").classList.toggle("hidden");
    document.querySelector("#log").classList.toggle("btnActive");
}
function openScientific() {
    document.querySelector(".science").classList.toggle("hidden");
    document.querySelector("#scientific").classList.toggle("btnActive");
}
function darkmodeHandler() {
    document.querySelector("body").classList.toggle("dark");
    document.querySelector("#themeHandler").classList.toggle("btnActive");
}
function alertInfo() {
    alert("Developer name: Matan Biton\nCalculator Version: Stage II\nThis is my basic calculator, have fun with it :)");
}
function openConfig() {
    location.pathname = "config/config.html";
}
function back() {
    //deletes from screen and resets the last of [first operand, operator, second operand]
    document.querySelector("#screen").textContent = "";
    if ((curOperand || firstOperand) && !curOperator) {
        clearScreen();
    }
    else if (curOperator && !curOperand) {
        curOperator = null;
        document.querySelector("#screen").textContent = firstOperand;
    }
    else {
        curOperand = null;
        document.querySelector("#screen").textContent =
            firstOperand + " " + curOperator + " ";
    }
}
function clearScreen() {
    document.querySelector("#screen").textContent = "";
    curOperand = firstOperand = curOperator = null;
    () => (document.querySelector(".log").textContent = "");
}
//calling back a function that sets listeners to objects in the HTML post load
document.addEventListener("DOMContentLoaded", onStart);
