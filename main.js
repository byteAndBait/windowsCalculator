
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
let firstNumber;
let secondNumber;
let operator;
let total = 0;
let resulted = false
mainCalculatorContainer.addEventListener("click", (e) => {
    // if user clicked a number
    if (e.target.classList.contains("number")) {
        if (resulted) {
            ac()

        }
        input += e.target.textContent;
        display.textContent = input;
    }

    // if user clicked an operator
    if (e.target.classList.contains("operator")) {
        if (Number.isInteger(firstNumber)) {
            secondNumber = +input;
            display.textContent = input
            input = ""
        } else {
            if (total) {
                firstNumber = total
            } else {
                firstNumber = +input;
            }
            input = ""

        }

        operator = e.target.textContent
        resulted = false;

        console.table([firstNumber, secondNumber, operator])
        if (Number.isInteger(firstNumber) && Number.isInteger(secondNumber)) {
            operate(firstNumber, secondNumber, operator)
        }
    }
    // If user clicks on a special key
    if (e.target.classList.contains("specialOperator")) {
        if (e.target.textContent == "=") {
            if (Number.isInteger(firstNumber)) {
                secondNumber = +input
                operate(firstNumber, secondNumber, operator)
            }
        }

        if (e.target.textContent == "AC") {
            ac()
        }

        if (e.target.textContent == "Del") {

            input = display.textContent
            input = input.split("").splice(0, 1).join("")
            display.textContent = input;
            if (input.split('').length == 1) {
                display.textContent = 0;
                input = ""
            }


        }


    }
})
function operate(first, second, op) {
    if (!(first || second)) {
        return
    }
    if (op == "+") { total = first + second }
    if (op == "-") { total = first - second }
    if (op == "*") { total = first * second }
    if (op == "/") { total = first / second }
    display.textContent = total.toString()
    operator = 0
    firstNumber = undefined;
    secondNumber = undefined;
    resulted = true
}

function ac() {
    firstNumber = secondNumber = undefined;
    total = operator = 0
    input = ""
    resulted = false;
    display.textContent = "0";
}