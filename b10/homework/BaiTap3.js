let currentInput = ''; // Current input shown on the display
let firstNumber = null; // First operand
let operator = null; // Current operator

// Append a number to the current input
function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

// Set the operator for the calculation
function setOperator(op) {
    if (currentInput === '') return; // Ignore if no input
    if (firstNumber === null) {
        firstNumber = parseFloat(currentInput);
    } else if (operator) {
        firstNumber = performCalculation();
    }
    operator = op;
    currentInput = ''; // Clear the input for the second number
}

// Perform the calculation based on the operator
function calculate() {
    if (operator === null || currentInput === '') return;
    currentInput = performCalculation();
    operator = null;
    firstNumber = null;
    updateDisplay();
}

// Perform the calculation
function performCalculation() {
    const secondNumber = parseFloat(currentInput);
    switch (operator) {
        case '+':
            return (firstNumber + secondNumber).toString();
        case '-':
            return (firstNumber - secondNumber).toString();
        case '*':
            return (firstNumber * secondNumber).toString();
        case '/':
            return secondNumber !== 0 ? (firstNumber / secondNumber).toString() : 'Error';
        default:
            return currentInput;
    }
}

// Clear the display and reset all variables
function clearDisplay() {
    currentInput = '';
    firstNumber = null;
    operator = null;
    updateDisplay();
}

// Update the display with the current input
function updateDisplay() {
    const display = document.getElementById('display');
    display.value = currentInput;
}
