/*
given the list [0]
when inputting check first if equalWasPressed to make it false and ac()
when inputting if the list has an index of 1 then we are inputting the firstNumber , and list[0] = +input
when operator is clicked 
    check first if the last element isn't a operator and is a number
        if so just return
    it's pushed to list,
    check if the list length is 4 to operate
    input = ""
when inputting if thel list has length of 2 then we are inputting secondNumber  , and list[2] = +input
the operate takes the 0 index as first and 1 as operator and 2 as secondNumber
then it calc the total and removes these 2 and 1 index and replace index 0 with total and there will be an operator at the end
, then it input the secondNumber cuz the length would be 2
*/

let display = document.querySelector(".display");
let mainCalculatorContainer = document.querySelector(".calculator");
let input = "";
let total;
let equalWasPressed = false;
let calculatorHistory = [0];
let historyElement = document.querySelector(".history");

mainCalculatorContainer.addEventListener("click", e => {
  // -------------------- input numbers
  if (e.target.classList.contains("number")) {
    function modify() {
      input += e.target.textContent;
      display.textContent = input;
    }
    if (equalWasPressed) {
      ac();
    }

    if (e.target.textContent == ".") {
      // console.log("user enterd .")
      if (input.length == 0) {
        input = "0";
      }
      if (input.split("").includes(".")) {
        console.log("There is a decimal point IDIOT");
      } else {
        modify();
      }
    } else {
      modify();
    }

    if (calculatorHistory.length == 1) {
      calculatorHistory[0] = +input;
      historyElement.textContent = calculatorHistory.join(" ");
    }
    if (calculatorHistory.length >= 2) {
      calculatorHistory[2] = +input;
      historyElement.textContent = calculatorHistory.join(" ");
    }
  }

  // -------------------- operators
  if (e.target.classList.contains("operator")) {
    if (isNaN(calculatorHistory[calculatorHistory.length - 1])) {
      calculatorHistory.splice(calculatorHistory.length - 1, 1);
    }
    calculatorHistory.push(e.target.textContent);
    if (calculatorHistory.length == 4) {
      operate(calculatorHistory);
    }
    historyElement.textContent = calculatorHistory.join(" ");
    input = "";

    // styling the current operation selected

    if (document.querySelector(".inUse")) {
      document.querySelector(".inUse").classList.remove("inUse");
    }
    e.target.classList.add("inUse");
    equalWasPressed = false;
  }

  // -------------------- Special operators
  if (e.target.classList.contains("specialOperator")) {
    if (e.target.textContent == "AC") {
      ac();
      display.textContent = 0;
    }
    if (e.target.textContent == "Del") {
      let index = calculatorHistory.indexOf(+input);
      console.log(calculatorHistory[index]);
      if (calculatorHistory[index].toString().length == 1) {
        input = "";
        display.textContent = input;
      } else {
        calculatorHistory[index] = calculatorHistory[index]
          .toString()
          .split("");
        console.log(calculatorHistory[index]);
        calculatorHistory[index].splice(calculatorHistory[index].length - 1, 1);
        console.log(calculatorHistory[index]);
        calculatorHistory[index] = +calculatorHistory[index].join("");
        input = calculatorHistory[index];
        display.textContent = input;
      }
    }

    if (e.target.textContent == "=") {
      if (calculatorHistory.length >= 3) {
        operate(calculatorHistory);
        equalWasPressed = true;
      }
    }
  }
});

function operate(arr) {
  if (arr.length < 3) {
    return;
  }
  if (arr[1] == "+") total = +arr[0] + +arr[2];
  if (arr[1] == "-") total = +arr[0] - +arr[2];
  if (arr[1] == "/") total = +arr[0] / +arr[2];
  if (arr[1] == "*") total = +arr[0] * +arr[2];
  arr.splice(1, 2);
  arr[0] = total;
  // console.log("after operation" + arr)
  display.textContent = arr[0].toFixed(2);
  historyElement.textContent = arr.join(" ");
  document.querySelector(".inUse").classList.remove("inUse");
  input = total;
}
function ac() {
  calculatorHistory = [0];
  equalWasPressed = false;
  total = undefined;
  input = "";
  historyElement.textContent = "";
}
