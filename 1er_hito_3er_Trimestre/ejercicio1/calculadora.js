const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;

        if (!action) {
            if (displayedNum === '0' || calculator.dataset.previousKeyType === 'operator' || calculator.dataset.previousKeyType === 'calculate') {
                display.textContent = keyContent;
            } else {
                display.textContent = displayedNum + keyContent;
            }
            calculator.dataset.previousKeyType = 'number';
        } else if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
            } else if (calculator.dataset.previousKeyType === 'operator' || calculator.dataset.previousKeyType === 'calculate') {
                display.textContent = '0.';
            }
            calculator.dataset.previousKeyType = 'decimal';
        } else if (action === 'clear') {
            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = '';
                calculator.dataset.modValue = '';
                calculator.dataset.operator = '';
                calculator.dataset.previousKeyType = '';
            } else {
                key.textContent = 'AC';
            }
            display.textContent = 0;
            calculator.dataset.previousKeyType = 'clear';
        } else if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            if (
                firstValue &&
                operator &&
                calculator.dataset.previousKeyType !== 'operator' &&
                calculator.dataset.previousKeyType !== 'calculate'
            ) {
                const calcValue = calculate(firstValue, operator, secondValue);
                display.textContent = calcValue;
                calculator.dataset.firstValue = calcValue;
            } else {
                calculator.dataset.firstValue = displayedNum;
            }

            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.operator = action;
        } else if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            if (firstValue) {
                if (calculator.dataset.previousKeyType === 'calculate') {
                    firstValue = displayedNum;
                }
                display.textContent = calculate(firstValue, operator, secondValue);
            }

            calculator.dataset.previousKeyType = 'calculate';
        } else if (action === 'percentage') { 
            const percentageValue = parseFloat(displayedNum) / 100;
            display.textContent = percentageValue;
            calculator.dataset.previousKeyType = 'percentage';
        } else if (action === 'square') { 
            const squareValue = parseFloat(displayedNum) ** 2;
            display.textContent = squareValue;
            calculator.dataset.previousKeyType = 'square';
        } else if (action === 'square-root') { 
            const squareRootValue = Math.sqrt(parseFloat(displayedNum));
            display.textContent = squareRootValue;
            calculator.dataset.previousKeyType = 'square-root';
        }
    }
});

const calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    if (operator === 'add') return firstNum + secondNum;
    if (operator === 'subtract') return firstNum - secondNum;
    if (operator === 'multiply') return firstNum * secondNum;
    if (operator === 'divide') return firstNum / secondNum;
};


