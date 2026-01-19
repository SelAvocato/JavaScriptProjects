///////////////////////////////////////////////// HOPING TO IMPROVE THIS PLEASE SEND TIPS////////////////////////////////////////////////////

const display = document.getElementById("display");
const dot = document.getElementById(".");
const clear = document.getElementById("clear");
const equal = document.getElementById("equal");
const add = document.getElementById("add");
const subtract = document.getElementById("subtract");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const backspace = document.getElementById("backspace");
const sign = document.getElementById("sign");
const operations = ["+", "-", "÷", "X"];

const checkNull = () => {
    if(display.textContent == 0 || display.textContent == null || display.textContent == ""){
    display.textContent = 0;
}}

let newDisplay = display.textContent;

function playDisplayAnim() {
    display.classList.remove("displayAnimation");
    void display.offsetWidth;
    display.classList.add("displayAnimation");
}

const li = document.querySelectorAll("li").forEach(btn => {btn.addEventListener("click", playDisplayAnim)})

function useNums(num){
    if(newDisplay == "0"){
        newDisplay = null;
        display.textContent = "";
        newDisplay += num;
        display.textContent = num;
    }
    else{
        display.textContent += num;
        newDisplay = Number(display.textContent);
    }
}

dot.addEventListener("click", function(){
    if(operations.includes(display.textContent.at(-1))){
        display.textContent += "0.";
    }
    else{
        display.textContent += ".";
        newDisplay += "."
    }
})

function checkOperation(operation){
    if(operations.includes(display.textContent.at(-1))){
        display.textContent = display.textContent.slice(0, -1) + operation;
    }
    else{
        display.textContent += operation
    }
}

sign.addEventListener("click", () => {
    if(display.textContent.at(0) == "-"){
        display.textContent = display.textContent.replace(display.textContent.at(0), "");
    }
    else{
        display.textContent = display.textContent.padStart(display.textContent.length + 1, "-");
    }
})

backspace.addEventListener("click", () => {
    if(display.textContent.length > 1){
        display.textContent = display.textContent.slice(0, -1)
    }
    else{
        display.textContent = display.textContent.slice(0, -1)
        display.textContent = "0";
        newDisplay = 0;
    }
})

add.addEventListener("click", function(){
    checkOperation("+")
});

subtract.addEventListener("click", function(){
    checkOperation("-")
});

multiply.addEventListener("click", function(){
    checkOperation("X")
});

divide.addEventListener("click", function(){
    checkOperation("÷") 
});

const isLongValue = total => {
    total = eval(display.textContent);
    if(total.toString().includes(".")){
        let valueString = total.toString().split(".");
        let decimalCount = valueString[1].length;
        if(decimalCount > 5){
            newDisplay = eval(display.textContent).toFixed(5);
            display.textContent = newDisplay;
        }
        else{
            newDisplay = eval(display.textContent);  
            display.textContent = newDisplay;
        }
    }
    else{
        newDisplay = eval(display.textContent);  
        display.textContent = newDisplay;
    }
}

equal.addEventListener("click", function(){
    if(operations.includes(display.textContent.at(-1))){
        display.textContent = display.textContent.slice(0, -1);
        display.textContent = display.textContent.replace("X", "*")
        display.textContent = display.textContent.replace("÷", "/")
        isLongValue(newDisplay);
    }
    else{
        display.textContent = display.textContent.replace("X", "*")
        display.textContent = display.textContent.replace("÷", "/")
        isLongValue(newDisplay);
    }
})

clear.addEventListener("click", function(){
    newDisplay = 0;
    display.textContent = "";
    checkNull();
})