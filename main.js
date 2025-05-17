
/*
    we want a calculator that can do +,-,/,* on each pair of numbers.

    given a display element and textContent from a delegation event we should operate.

    make a variables Total,firstNumber, secondNumber and the input.

    make references with delegation for numbers and operators,special functions.

    make a function checkInput that when the one of the operators is clicked, if the input
    has a value so put the value to the firstNumber varaible , and when it's clicked again 
    check whether the firstNumber has value if so put it to the secondNumber .

    and in every click check if the both numbers have values if so operate(first,second,op).
    in operate() make condition for every operation and then assign the result to the total
    and assign the firstNumber value to the total value so we can use it again, and display the total.

    when = is clicked do operate.
    when AC is clicked reset all the values and display zero.

    **Note** when clicking a number make the firstNumber = 0
    */
let display = document.querySelector(".display")
let mainCalculatorContainer = document.querySelector(".calculator")
let input = "";
let firstNumber = 0;
let secondNumber = 0;
let operator = 0;
let total = 0;

mainCalculatorContainer.addEventListener("click", (e) => {
    // if user clicked a number
    if (e.target.classList.contains("number")) {

        input += e.target.textContent;
        display.textContent = input;
    }

    // if user clicked an operator
    if (e.target.classList.contains("operator")) {

        if (firstNumber) {
            secondNumber = +input;
            input = "";
            display.textContent = input
            console.log("second " + secondNumber)
        } else {
            firstNumber = +input;
            input = "";
            console.log("first " + firstNumber)
        }
        if (e.target.textContent == "=") {
            operate(firstNumber, secondNumber, operator)
            firstNumber = 0;
            secondNumber = 0;
            input = total
            display.textContent = input;
        } else {
            operator = e.target.textContent
        }
        if (firstNumber && secondNumber) {
            operate(firstNumber, secondNumber, operator)
        }

    }
    // If user clicks on a special key
    if (e.target.classList.contains("specialOperator")) {
        if (e.target.textContent == "AC") {
            firstNumber = secondNumber = total = operator = 0
            input = "0"
            display.textContent = input;
        }
        if (e.target.textContent == "Del") {
            input = input.split("").splice(0, 1).join("")
            display.textContent = input;

        }
    }
})
function operate(first, second, op) {
    if (op == "+") { total = first + second }
    if (op == "-") { total = first - second }
    if (op == "*") { total = first * second }
    if (op == "/") { total = first / second }
    firstNumber = total;
    secondNumber = 0;
    input = firstNumber;
    display.textContent = input.toString()
    input = "";
    console.table([first, second, op, total])

}
