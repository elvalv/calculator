let clearResult = false;

function roundNumber(number) {
    return Math.round(number * 100000) / 100000;
}

function add(a,b) {
    return roundNumber(a+b);
}

function subtract(a,b) {
    return roundNumber(a-b);
}

function divide(a,b) {
    return roundNumber(a/b);
}

function multiply(a,b) {
    return roundNumber(a*b);
}

function modulo(a,b) {
    return roundNumber(a%b);
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

function checkOperationLimit(line, currentButton) {
    // this regex is used to check if currentButton has an operational value
    const regex = /[%+\-*\u00f7]/;
    if(line !== null && line.length === 3 && regex.test(currentButton)) {
        operate();
    }
}

function checkDecimal(line, decimal) {
    // const rege = /./
    if (line !== null && decimal === "." && line.at(-1).includes(decimal)) {
        return true;
    } else {
        return false;
    }
}

function checkEmptyOperationDecimal(line, decimal) {
    const regex = /[%+\-*\u00f7]/;
    const checkEmptyDecimal = line === null && decimal === ".";
    const checkOperationDecimal = line !== null && regex.test(line.at(-1)) && decimal === ".";
    if (checkEmptyDecimal || checkOperationDecimal) {
        return true;
    } else {
        return false;
    }
}

function isNegative(str) {
    const num = Number(str);
    return Number.isFinite(num) && num < 0;
}

function checkNegative(line) {
    if(line !== null && line.length == 2 && isNegative(line.at(-1)) ) {
        line.push(line[1].replaceAll("-", ""));
        line[1] = "-";
        return line;
    } else if (line !== null && line.length == 2 && line.at(-1) === "-0") {
        line.push(line[1].replaceAll("-", ""));
        line[1] = "-";
        return line;
    } else if (line !== null && line.length == 2 && line.at(-1) === "-0.") {
        line.push(line[1].replaceAll("-", ""));
        line[1] = "-";
        return line;
    } else {
        return line;
    }
}

// adds the buttons text into display
function addText(event) {
    const input = document.querySelector(".screen");
    const text = event.target.textContent;
    const operationLine = input.value;
    let line = operationLine.match(/-?[0-9.]+|[%+\-*\u00f7]/g);
    line = checkNegative(line);
    const operations = /[%+\-*\u00f7]/;
    checkOperationLimit(line, text);

    if (line === null && operations.test(text) && text !== "-") {
        console.log("Invalid operation!");
    } else if (line !== null && line.length === 2 && operations.test(text)) {
        console.log("invalid operation");
    } else if(clearResult && text === ".") {
        input.value = "0.";
        clearResult=false;
    } else if(clearResult && !operations.test(text)) {
        input.value = text;
        clearResult=false;
    } else if (line !== null && line.at(-1) === "0" && text !== ".") {
        // first if statment deals with leading zeros
        const sliceValue = input.value.slice(0,input.value.length-1);
        input.value = sliceValue+text;
    } else if (checkEmptyOperationDecimal(line, text)) {
        input.value = input.value+"0.";
    } else if (!checkDecimal(line, text)) {
        input.value = input.value+text;
        clearResult = false;
    }
}

/* 
    This function will check the behavior of each operations
    And make sure they are valid behaviors
*/
function operationBehaviors(event) {
    const input = document.querySelector(".screen");
    const currenOperation = event.target.textContent;
    const operationLine = input.value;
    let line = operationLine.match(/-?[0-9.]+|[%+\-*\u00f7]/g);
    line = checkNegative(line);
    const operations = /[%+\-*\u00f7]/;


    if (line !== null && line.length == 2 && operations.test(currenOperation)) {
        input.value = input.value.slice(0,1)+currenOperation;
    } else if (!(line === null && currenOperation !== "-")) {
    /*
        if the dislay it not empty, you can add the operation
        if the display is empty, and you click subtraction, you can add negative sign
    */
        addText(event);
    }
}

function addDisplayEvents() {
    const numberButtons = document.querySelectorAll(".display");
    numberButtons.forEach((button) => {
        button.addEventListener("click", addText);
    });

    const operationsButtons = document.querySelectorAll(".op");
    operationsButtons.forEach((button) => {
        button.addEventListener("click", operationBehaviors);
    }); 
}

function checkDivisionByZero(answer) {
    if(answer === Infinity || answer === -Infinity || answer === NaN) {
        return "Cannot divide by zero!";
    } else {
        return answer;
    }
}

function operate() {
    const input = document.querySelector(".screen");
    const operationLine = input.value;
    let line = operationLine.match(/-?[0-9.]+|[%+\-*\u00f7]/g);
    line = checkNegative(line);

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
            answer = checkDivisionByZero(answer);
            break;
        case "*":
            answer = multiply(a,b);
            break;
        case "%":
            answer = modulo(a,b);
            break;
    }
    input.value = answer;
    clearResult = true;
}

function equalsBehavior() {
    const input = document.querySelector(".screen");
    const operationLine = input.value;
    let line = operationLine.match(/-?[0-9.]+|[%+\-*\u00f7]/g);
    line = checkNegative(line);
    if (line !== null && line.length === 3){
        operate();
    }
}

const equals = document.querySelector(".equals");
equals.addEventListener("click", equalsBehavior);

const backspace = document.querySelector(".backspace");
backspace.addEventListener("click", addBackspaceEvent);

const clear = document.querySelector(".clear");
clear.addEventListener("click", addClearEvent);

const negativeSign = document.querySelector(".negative-sign");
negativeSign.addEventListener("click", () => {
    const input = document.querySelector(".screen");
    input.value = "Surprise!"
    clearResult = true;
})

addDisplayEvents();