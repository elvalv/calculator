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

function modulo(a,b) {
    return a%b;
}

function addClearEvent(event) {
    const input = document.querySelector(".screen");
    if (input.value !== "") {
        input.value = "";
    }
}

function addBackspaceEvent(event) {
    const input = document.querySelector(".screen");
    if (input.value !== "") {
        input.value = input.value.slice(0,-1);
    }
}

// adds the buttons text into display
function addText(event) {
    const input = document.querySelector(".screen");
    const text = event.target.textContent;

    const operationLine = input.value;
    const line = operationLine.match(/[0-9.]+|[%+\-*\u00f7]/g);
    if(line !== null && line.length === 3 ) {
        operate();
    }
    input.value = input.value+text;
}

function addDisplayEvents() {
    const numberButtons = document.querySelectorAll(".display");
    numberButtons.forEach((button) => {
        button.addEventListener("click", addText);
    });
}

function operate() {
    const input = document.querySelector(".screen");
    const operationLine = input.value;
    const line = operationLine.match(/[0-9.]+|[%+\-*\u00f7]/g);
    // alert(line);

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
        case "%":
            answer = modulo(a,b);
            break;
    }
    input.value = answer;
}

const equals = document.querySelector(".equals");
equals.addEventListener("click", operate);

const backspace = document.querySelector(".backspace");
backspace.addEventListener("click", addBackspaceEvent);

const clear = document.querySelector(".clear");
clear.addEventListener("click", addClearEvent);

addDisplayEvents();