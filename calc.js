function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function divide(a,b) {
    return a/b;
}

function multiply(a,b) {
    return a*b;
}

function addBackspaceEvent(event) {
    const input = document.querySelector(".screen");
    if (input.value !== "") {
        input.value = input.value.slice(0,-1);
    }
}

function addText(event) {
    const input = document.querySelector(".screen");
    const text = event.target.textContent;
    input.value = input.value+text;
}

function addNumberEvents() {
    const numberButtons = document.querySelectorAll(".display");
    numberButtons.forEach((button) => {
        button.addEventListener("click", addText);
    });
}

function operate() {
    const input = document.querySelector(".screen");
    const operationLine = input.value;
    const line = operationLine.match(/[0-9.]+|[+\-*\u00f7]/g);

    const a = Number(line[0]);
    const b = Number(line[2]);
    const operation = line[1];

    let answer = 0;
    switch(operation) {
        case "+":
            answer = add(a,b);
            break;
        case "-":
            answer = subtract(a,b);
            break;
        case "\u00f7":
            answer = divide(a,b);
            break;
        case "*":
            answer = multiply(a,b);
            break;
    }
    input.value = answer;
}

const equals = document.querySelector(".equals");
equals.addEventListener("click", operate);

const backspace = document.querySelector(".backspace");
backspace.addEventListener("click", addBackspaceEvent);

addNumberEvents();