function onStart() {
    // adding the onclick listeners to all the digits, the four basic operators and the dot
    for (const btn of Array.from(document.querySelectorAll("button.digit, button.dot"))) {
        btn.addEventListener('click', () => { toScreen(btn.id); });
    }
    for (const btn of Array.from(document.querySelectorAll("button.operator"))) {
        btn.addEventListener('click', () => { operatorClicked(btn.id); });
    }
    // if page is loaded after configuration then sets the style accordingly
    const search = new URLSearchParams(window.location.search);
    document.body.style.backgroundColor =
        search.get('colorpick');
    document.body.style.fontFamily = search.get('font');
    if (search.get('theme') == 'dark') {
        document.body.classList.add('dark');
    }
    else {
        document.body.classList.remove('dark');
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
function screenLight() {
    document.querySelector("#screen").classList.toggle("light");
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
    if ((curOperand != null || firstOperand != null) && curOperator === null) {
        clearScreen();
    }
    else if (curOperator && curOperand === null) {
        curOperator = null;
        document.querySelector("#screen").textContent = firstOperand;
    }
    else if (curOperand != null) {
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
